import { z } from 'zod';

export default async function validate(formData, edit = false) {
	const schema = z.object({
		title: z
			.string()
			.min(4, 'Title must be at least 4 characters')
			.max(40, 'Title must be less than 40 characters')
			.nonempty('Book title is required.'),
		author: z
			.string()
			.min(5, 'Author must be at least 5 characters')
			.max(200, 'Author must be less than 200 characters')
			.nonempty('Author is required'),
		short_description: z
			.string()
			.min(5, 'Short description must be at least 5 characters')
			.max(200, 'Short description must be less than 200 characters')
			.nonempty('Short description is required'),
		description: z
			.string()
			.min(5, 'Description must be at least 5 characters')
			.max(4500, 'Description must be less than 4500 characters')
			.nonempty('Description is required'),
		small_picture: z
			.any()
			.nullable()
			.superRefine((value, ctx) => {
				// if (edit) {
				// 	return;
				// }
				// Check if required
				if (!edit && !value) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Small Picture required'
					});
				}
				// Check file type
				if (value && value.type && !['image/png', 'image/jpeg'].includes(value.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'The file must be an image'
					});
				}
				// Check file size
				if (value && value.size && value.size >= 4_000_000) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'The file must be under 4 MB.'
					});
				}
			}),
		main_picture: z
			.any()
			.nullable()
			.superRefine((value, ctx) => {
				// if (edit) {
				// 	return;
				// }
				// Check if required
				if (!edit && !value) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Main Picture required'
					});
				}
				// Check file type
				if (value && value.type && !['image/png', 'image/jpeg'].includes(value.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'The file must be an image'
					});
				}
				// Check file size
				if (value && value.size && value.size >= 4_000_000) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'The file must be under 4 MB.'
					});
				}
			})
	});

	const data = {
		title: formData.get('title'),
		author: formData.get('author'),
		short_description: formData.get('short_description'),
		description: formData.get('description'),
		main_picture: emptyFileIsNull(formData.get('main_picture')),
		small_picture: emptyFileIsNull(formData.get('small_picture'))
	};

	try {
		await schema.parseAsync(data);
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

function emptyFileIsNull(file) {
	if (file.size === 0) {
		return null;
	}

	return file;
}
