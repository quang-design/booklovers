import { setDoc, collection, doc } from 'firebase/firestore';
import { db } from './firebase.client';

export async function setUser(userId) {
	try {
		const users = collection(db, 'users');
		await setDoc(doc(users, userId), {
			user_id: userId
		});
		console.log('User document successfully written!');
	} catch (error) {
		console.error('Error writing user document:', error);
		throw error;
	}
}
