import { auth } from '$lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import { writable } from 'svelte/store';

type TAuthStore = {
	isLoading: boolean;
	currentUser: User | null;
};

export const authStore = writable<TAuthStore>({
	isLoading: true,
	currentUser: null
});

export const authHandlers = {
	signIn: async () => {
		await signInWithPopup(auth, new GoogleAuthProvider());
	},
	signOut: async () => {
		await signOut(auth);
	}
};
