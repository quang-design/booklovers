import pkg from 'firebase-admin';
const { firestore } = pkg;
import { db } from './firebase.server';
import { saveFileToBucket } from './firestorage.server';

export async function addBook(book, userId) {
	if (!userId) {
		throw new Error('userId is required to add a book');
	}

	// save to the 'firestore database without picture information'
	const bookCollection = db.collection('books');

	const bookRef = await bookCollection.add({
		title: book.title,
		short_description: book.short_description,
		description: book.description,
		author: book.author,
		user_id: userId,
		created_at: firestore.Timestamp.now().seconds,
		likes: 0
	});

	// save the pictures
	const smallPictureUrl = await saveFileToBucket(
		book.small_picture,
		`${userId}/${bookRef.id}/small_picture`
	);
	const mainPictureUrl = await saveFileToBucket(
		book.main_picture,
		`${userId}/${bookRef.id}/main_picture`
	);

	// update the doc in the firestore database with the picture urls
	await bookRef.update({
		small_picture: smallPictureUrl,
		main_picture: mainPictureUrl
	});

	// return book id
	return bookRef.id;
}

export async function getBook(id) {
	const bookRef = await db.collection('books').doc(id).get();

	if (bookRef.exists) {
		return { id: bookRef.id, ...bookRef.data() };
	}
}
