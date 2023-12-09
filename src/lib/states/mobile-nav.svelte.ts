import { browser } from '$app/environment';

export function createNavState() {
	let isOpen = $state(false);
	let windowWidth = $state<number | undefined>(browser ? window.innerWidth : undefined);

	function toggle() {
		isOpen = !isOpen;
	}

	$effect(() => {
		if (windowWidth) {
			if (windowWidth > 768 && isOpen) {
				isOpen = false;
			}
		}
	});

	$effect(() => {
		const handleResize = () => {
			windowWidth = window.innerWidth;
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	return {
		get isOpen() {
			return isOpen;
		},
		get windowWidth() {
			return windowWidth;
		},
		set isOpen(value) {
			isOpen = value;
		},
		toggle
	};
}
