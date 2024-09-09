export default defineI18nConfig(() => ({
    legacy: false,
    fallbackLocale: 'en',
    numberFormats: {
        en: {
            currency: {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            },
        },
    },
}));
