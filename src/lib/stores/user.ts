import type { User } from '$lib/db/schemas';
import { writable } from 'svelte/store';

export const userStore = writable<User | null>(null);
