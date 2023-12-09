import {
	collection,
	getDocs,
	type FirestoreDataConverter,
	QueryDocumentSnapshot,
	type DocumentData,
	type SnapshotOptions,
	type WithFieldValue,
	query,
	where,
	addDoc,
	serverTimestamp,
	orderBy
} from 'firebase/firestore';
import { firestore } from './firebase';
import type { Order } from './types';

const orderConverter: FirestoreDataConverter<Order> = {
	toFirestore(order: WithFieldValue<Order>): DocumentData {
		return order;
	},
	fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Order {
		const data = snapshot.data(options);
		return {
			id: snapshot.id,
			userId: data.userId,
			productId: data.productId,
			createdAt: data.createdAt.toDate()
		};
	}
};

const ordersRef = collection(firestore, 'orders');

export async function getOrders() {
	const snap = await getDocs(ordersRef.withConverter(orderConverter));
	return snap.docs.map((doc) => doc.data());
}

export async function getOrdersByUser(userId: string) {
	const q = query(
		ordersRef,
		where('userId', '==', userId),
		orderBy('createdAt', 'asc')
	).withConverter(orderConverter);
	const snap = await getDocs(q);
	return snap.docs.map((doc) => doc.data());
}

export async function addOrder(productId: string, userId: string) {
	await addDoc(ordersRef, {
		productId,
		userId,
		createdAt: serverTimestamp()
	});
}
