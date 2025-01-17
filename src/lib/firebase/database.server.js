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

export async function getBook(id, userId = null) {
	const bookRef = await db.collection('books').doc(id).get();

	if (bookRef.exists) {
		const user = userId ? await getUser(userId) : null;
		const likedBook = user?.bookIds?.includes(id) || false;

		return { id: bookRef.id, ...bookRef.data(), likedBook };
	}
}

export async function getUser(userId) {
	const user = await db.collection('users').doc(userId).get();

	return user?.data();
}

export async function editBook(id, form, userId) {
	const bookRef = db.collection('books').doc(id);

	let mainPicture = form.main_picture || null;
	let smallPicture = form.small_picture || null;

	delete form.main_picture;
	delete form.small_picture;

	await bookRef.update(form);

	// Handle picture uploads if provided
	if (mainPicture) {
		const mainPictureUrl = await saveFileToBucket(
			mainPicture,
			`${userId}/${bookRef.id}/main_picture`
		);

		await bookRef.update({ main_picture: mainPictureUrl });
	}

	if (smallPicture) {
		const smallPictureUrl = await saveFileToBucket(
			smallPicture,
			`${userId}/${bookRef.id}/small_picture`
		);

		await bookRef.update({ small_picture: smallPictureUrl });
	}
}

export async function toggleBookLike(bookId, userId) {
	const bookDoc = db.collection('books').doc(bookId);

	const userDoc = db.collection('users').doc(userId);

	const user = await userDoc.get();

	const userData = user.data();

	if (userData.bookIds && userData.bookIds.includes(bookId)) {
		await userDoc.update({
			bookIds: firestore.FieldValue.arrayRemove(bookId)
		});

		await bookDoc.update({
			likes: firestore.FieldValue.increment(-1)
		});
	}
	// like the book
	else {
		await userDoc.update({
			bookIds: firestore.FieldValue.arrayUnion(bookId)
		});

		await bookDoc.update({
			likes: firestore.FieldValue.increment(1)
		});
	}
	return await getBook(bookId, userId);
}
