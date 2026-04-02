import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Client } from 'pg';

const TEST_DB = 'heirloomdb_test';

export default async function globalSetup() {
	dotenv.config({
		path: path.join(__dirname, '../../server/.env.development'),
	});

	const {
		DB_HOST = 'localhost',
		DB_PORT = '5432',
		DB_USER = 'postgres',
		DB_PASS = '',
	} = process.env;

	const adminClient = new Client({
		host: DB_HOST,
		port: Number(DB_PORT),
		user: DB_USER,
		password: DB_PASS,
		database: 'postgres',
	});

	await adminClient.connect();

	// Terminate any existing connections to the test DB before dropping
	await adminClient.query(`
		SELECT pg_terminate_backend(pid)
		FROM pg_stat_activity
		WHERE datname = '${TEST_DB}' AND pid <> pg_backend_pid()
	`);

	await adminClient.query(`DROP DATABASE IF EXISTS "${TEST_DB}"`);
	await adminClient.query(`CREATE DATABASE "${TEST_DB}"`);
	await adminClient.end();

	// Apply schema.sql directly — it is the authoritative full-state dump
	// maintained by dbmate and is updated each time migrate.sh is run
	const schema = fs.readFileSync(
		path.join(__dirname, '../../db/schema.sql'),
		'utf8',
	);

	const testClient = new Client({
		host: DB_HOST,
		port: Number(DB_PORT),
		user: DB_USER,
		password: DB_PASS,
		database: TEST_DB,
	});

	// Strip dbmate psql meta-commands (\restrict / \unrestrict) that the pg
	// client cannot parse — they are only meaningful to the psql CLI.
	const cleanSchema = schema
		.split('\n')
		.filter((line) => !line.startsWith('\\'))
		.join('\n');

	await testClient.connect();
	await testClient.query(cleanSchema);
	await testClient.end();
}
