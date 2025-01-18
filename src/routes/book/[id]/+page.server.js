import { getBook } from '$lib/firebase/database.server.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const book = await getBook(params.id);

	if (!book) {
		throw error(404, { message: 'Book not found' });
	}
	// console.log(book);
	return { book };
}