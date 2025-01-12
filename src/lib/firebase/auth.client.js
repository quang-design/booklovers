import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail
} from 'firebase/auth';

export async function loginWithGoogle() {
	const auth = getAuth();
	const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
	return userCredential.user;
}

export async function logout() {
	await getAuth().signOut();
}

export async function registerWithEmailAndPassword(email, password) {
	const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
	return userCredential.user;
}

export async function loginWithEmailAndPassword(email, password) {
	const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
	return userCredential.user;
}

export async function resetPassword(email) {
	await sendPasswordResetEmail(getAuth(), email);
}
