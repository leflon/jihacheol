import { writable } from 'svelte/store';

type JihacheolStorage = {
	/* Hard mode: removign the direction from hints and removing colors from map */
	hardMode: boolean;
};

let storedEnabled;
let storedHard;
let storedShowMap;

try {
	storedHard = JSON.parse(localStorage.getItem('jihacheol:hardMode') || '');
} catch {
	storedHard ??= false;
}
export const storage = writable<JihacheolStorage>({
	hardMode: storedHard
});

storage.subscribe((val) => {
	Object.entries(val).forEach(([k, v]) => {
		typeof window !== 'undefined' && localStorage.setItem(`jihacheol:${k}`, JSON.stringify(v));
	});
});
