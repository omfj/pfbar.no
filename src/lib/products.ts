import {
	collection,
	getDocs,
	type FirestoreDataConverter,
	QueryDocumentSnapshot,
	type DocumentData,
	type SnapshotOptions,
	type WithFieldValue
} from 'firebase/firestore';
import { firestore } from './firebase';
import type { Product } from './types';

const productConverter: FirestoreDataConverter<Product> = {
	toFirestore(product: WithFieldValue<Product>): DocumentData {
		return product;
	},
	fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Product {
		const data = snapshot.data(options);
		return {
			id: snapshot.id,
			name: data.name,
			description: data.description,
			inStock: data.inStock,
			image: data.image
		};
	}
};

export async function getProducts() {
	const snap = await getDocs(collection(firestore, 'products').withConverter(productConverter));
	return snap.docs.map((doc) => doc.data());
}
