import * as dotenv from 'dotenv';
import * as path from 'path';
import { Client } from 'pg';

const TEST_DB = 'heirloomdb_test';

export default async function globalTeardown() {
	dotenv.config({
		path: path.join(__dirname, '../../server/.env.development'),
	});

	const {
		DB_HOST = 'localhost',
		DB_PORT = '5432',
		DB_USER = 'postgres',
		DB_PASS = '',
	} = process.env;

	const client = new Client({
		host: DB_HOST,
		port: Number(DB_PORT),
		user: DB_USER,
		password: DB_PASS,
		database: 'postgres',
	});

	await client.connect();

	await client.query(`
		SELECT pg_terminate_backend(pid)
		FROM pg_stat_activity
		WHERE datname = '${TEST_DB}' AND pid <> pg_backend_pid()
	`);

	await client.query(`DROP DATABASE IF EXISTS "${TEST_DB}"`);
	await client.end();
}
