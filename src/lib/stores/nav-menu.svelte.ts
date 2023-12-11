import { browser } from '$app/environment';

const MD = 768;

export function createNavMenuStore() {
	let isOpen = $state(false);
	let windowWidth = $state(browser ? window.innerWidth : undefined);

	$effect(() => {
		const onResize = () => {
			windowWidth = window.innerWidth;
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	$effect(() => {
		if (windowWidth && windowWidth >= MD) {
			isOpen = false;
		}
	});

	return {
		get isOpen() {
			return isOpen;
		},
		set isOpen(value) {
			isOpen = value;
		},
		toggle() {
			isOpen = !isOpen;
		}
	};
}
