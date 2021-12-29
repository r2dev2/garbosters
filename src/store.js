import { writable } from 'svelte/store';

export const cursor = writable(0);
export const allWordsPotentiallySolved = writable(false);
