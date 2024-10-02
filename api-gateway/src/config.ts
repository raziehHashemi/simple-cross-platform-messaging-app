export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    swagger: {
        env: process.env.SWAGGER_ENV,
        server: process.env.SWAGGER_SERVER,
    },
    auth: {
        secret: process.env.SECRET_KEY,
        expirationTime: process.env.TOKEN_EXPIRATION_TIME
    },
    localization: {
        fallbackLanguage: process.env.FALLBACK_LANGUAGE || "en",
        path: "./i18n/",
        watch: true,
    }
});