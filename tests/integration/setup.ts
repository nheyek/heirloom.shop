// Set DB_NAME before any module imports so dotenv-flow (loaded by mikro-orm.config.ts)
// does not override it with the value from .env.development
process.env.DB_NAME = 'heirloomdb_test';
