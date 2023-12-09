import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { storage } from './firebase';

export async function getImageUrl(image?: string | null) {
	if (!image) {
		throw new Error('No image provided');
	}

	return await getDownloadURL(storageRef(storage, image));
}
