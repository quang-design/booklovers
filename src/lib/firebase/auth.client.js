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
	await fetch('/logout');
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

export async function sendJWTToken() {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		return;
	}

	const token = await user.getIdToken(true);
	await fetch('/token', {
		method: 'POST',
		body: JSON.stringify({
			token,
			email: user.email
		})
	});
}
