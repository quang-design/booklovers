import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword
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
