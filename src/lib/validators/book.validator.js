import { z } from 'zod';

const MAX_FILE_SIZE = 5_000_000; // 5MB in bytes
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

const imageValidator = z.any().superRefine((value, ctx) => {
	// Check if image is provided
	if (!value || value === undefined) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Image is required',
			fatal: true
		});
		return z.NEVER;
	}

	// Check file size
	if (value?.size > MAX_FILE_SIZE) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Image size must be less than 5MB`,
			fatal: true
		});
		return z.NEVER;
	}

	// Check file type
	if (!value?.type || !ACCEPTED_IMAGE_TYPES.includes(value.type)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Only ${ACCEPTED_IMAGE_TYPES.map((type) => type.split('/')[1]).join(', ')} formats are supported`,
			fatal: true
		});
		return z.NEVER;
	}
});

export default async function validate(formData) {
	const schema = z.object({
		title: z
			.string()
			.nonempty('Title is required...')
			.min(4, 'Title must be at least 4 characters')
			.max(40, 'Title must be less than 40 characters'),
		author: z
			.string()
			.nonempty('Author is required')
			.min(5, 'Author must be at least 5 characters')
			.max(200, 'Author must be less than 200 characters'),
		short_description: z
			.string()
			.nonempty('Short description is required')
			.min(5, 'Short description must be at least 5 characters')
			.max(200, 'Short description must be less than 200 characters'),
		description: z
			.string()
			.nonempty('Description is required')
			.min(5, 'Description must be at least 5 characters')
			.max(4500, 'Description must be less than 4500 characters'),
		small_picture: imageValidator,
		main_picture: imageValidator
	});
	const data = {
		title: formData.get('title'),
		author: formData.get('author'),
		short_description: formData.get('short_description'),
		description: formData.get('description'),
		small_picture: formData.get('small_picture'),
		main_picture: formData.get('main_picture')
	};

	try {
		await schema.parse(data);
		return { success: true, book: data };
	} catch (error) {
		const errors = error.errors.reduce((agg, e) => {
			if (!agg['error_' + e.path.join('_')]) {
				agg['error_' + e.path.join('_')] = e.message;
			}
			return agg;
		}, {});

		delete data.small_picture;
		delete data.main_picture;

		return { ...errors, ...data, success: false };
	}
}
