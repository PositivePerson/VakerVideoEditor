/**
 * * ==== FOR FUTURE USE ====
 */
module.exports = {
	locales: ['en', 'de'],
	defaultLocale: 'en',
	pages: {
		'*': ['common'],
		'/404': ['error'],
		'/': ['landing'],
		'/dashboard': ['home'],
		'/contact': ['contact'],
		'/dashboard/support': ['contact'],
	},
	interpolation: {
		prefix: '${',
		suffix: '}',
	},
	loadLocaleFrom: (locale, namespace) =>
		import(`./src/locales/${locale}/${namespace}`).then((m) => m.default),
};
