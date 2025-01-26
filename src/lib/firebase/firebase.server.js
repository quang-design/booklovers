import { GOOGLE_SERVICES_ACCOUNT } from '$env/static/private';
import admin from 'firebase-admin';

if (admin.apps.length === 0) {
	admin.initializeApp({
		// @ts-ignore
		credential: admin.credential.cert(JSON.parse(GOOGLE_SERVICES_ACCOUNT))
	});
}

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
