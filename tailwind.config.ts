import { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
				screens: {
					sm: '100%',
					md: '100%',
					lg: '1024px',
					xl: '1280px'
				}
			},
			colors: {
				github: {
					background: '#24292e',
					foreground: '#f1f1f1'
				}
			}
		}
	},
	plugins: []
} satisfies Config;
