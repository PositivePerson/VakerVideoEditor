module.exports = {
	// Enable JIT for a faster development experience:
	// https://tailwindcss.com/docs/just-in-time-mode
	mode: 'jit',
	// Inform Tailwind of where our classes will be defined:
	// https://tailwindcss.com/docs/optimizing-for-production
	purge: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			xxs: '380px',
			// => @media (min-width: 380px) { ... }

			xs: '450px',
			// => @media (min-width: 380px) { ... }

			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			fontFamily: {
				manrope: ['Manrope'],
			},
			colors: {
				main: '#43597D',
				'font-1': '#333539',
				'font-2': '#929292',
				'font-icon': '#D5D5D5',
				'bg-1': '#FCFCFC',
				'bg-2': '#FFFFFF',
				'bg-3': '#F5FAFE',
				'blue-dashboard': '#8AE0FB',
			},
		},
	},
	variants: {
		extend: {},
	},
	// Add some basic Tailwind plugins to add additional features:
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
	],
};
