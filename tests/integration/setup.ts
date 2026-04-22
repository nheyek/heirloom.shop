import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env vars before any module imports so dotenv-flow does not override them
dotenv.config({ path: path.join(__dirname, '../../server/.env.development') });
process.env.DB_NAME = 'heirloomdb_test';
process.env.NODE_ENV = 'testing';
