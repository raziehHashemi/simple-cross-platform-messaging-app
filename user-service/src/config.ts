export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        type: process.env.DB_TYPE,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
        autoLoadModels: true,
        synchronize: true,
        migrationsRun: true,
    },
    localization: {
        fallbackLanguage: process.env.FALLBACK_LANGUAGE || "en",
        path: "./i18n/",
        watch: true,
    }
});