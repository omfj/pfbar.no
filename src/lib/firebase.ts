import { browser } from '$app/environment';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBkzD4Xhc277icQYMmkFjEcgsckq3X5jY0',
	authDomain: 'pink-flamingo-405415.firebaseapp.com',
	projectId: 'pink-flamingo-405415',
	storageBucket: 'pink-flamingo-405415.appspot.com',
	messagingSenderId: '288559307528',
	appId: '1:288559307528:web:36c991983526769478eabd',
	measurementId: 'G-B61WF630WR'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const analytics = browser ? getAnalytics(app) : null;
