import { addBook } from '$lib/firebase/database.server.js';
import validate from '$lib/validators/book.validator.js';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = await validate(formData);

		if (!data.success) {
			return fail(422, data);
		}

		const bookId = await addBook(data.book, locals.user.id);

		throw redirect(303, `/book/${bookId}`);
	}
};
