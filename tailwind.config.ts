import { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
				screens: {
					'2xl': '1280px'
				}
			}
		}
	},
	plugins: []
} satisfies Config;
