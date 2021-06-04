/**
 * * Framer Motion Animation Settings *
 */
const easing = [0.6, -0.05, 0.01, 0.99];

/**
 * * Framer Motion FadeIn Animation
 */
const banner = {
	initial: {
		y: 60,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: easing,
		},
	},
};

const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export { easing, banner, stagger };
