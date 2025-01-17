import { PUBLIC_STORAGE_BUCKET } from '$env/static/public';
import { storage } from './firebase.server';
import { tmpdir } from 'os';
import fs from 'fs';
import path from 'path';

/**
 * @param {string} destination
 * @param {File} file
 */
export async function saveFileToBucket(file, destination) {
	const filePath = await saveFileToDisk(file);
	const uploadResult = await storage
		.bucket(PUBLIC_STORAGE_BUCKET)
		.upload(filePath, { destination, public: true });

	return uploadResult[0].publicUrl();

	// // Toggle between public and private
	// await storage.bucket(PUBLIC_STORAGE_BUCKET).file(destination).makePublic();
	// return uploadResult[0].publicUrl();

	// // Download for certain amount of time
	// return await storage
	// 	.bucket(PUBLIC_STORAGE_BUCKET)
	// 	.file(destination)
	// 	.getSignedUrl({
	// 		action: 'read',
	// 		expires: new Date('03-09-2491')
	// 	});
}

/**
 * @param {File} file
 */
async function saveFileToDisk(file) {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const uuid = crypto.randomUUID();
	const filePath = path.join(tmpdir(), uuid);
	fs.writeFileSync(filePath, buffer, 'base64');
	return filePath;
}
