/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	extensionsToTreatAsEsm: ['.ts'],
	testEnvironment: 'node',
	maxWorkers: 1,
	testMatch: ['<rootDir>/tests/integration/tests/**/*.test.ts'],
	moduleNameMapper: {
		'^@heirloom/common/(.*)$': '<rootDir>/common/$1',
		'^@server/(.*)$': '<rootDir>/server/src/$1',
		'^@client/(.*)$': '<rootDir>/client/src/$1',
		// Strip .js extensions from relative imports so Jest can resolve .ts source files.
		// TypeScript (with moduleResolution: Bundler/NodeNext) emits .js extensions on
		// relative imports, but Jest's resolver looks for literal files — not .ts sources.
		'^(\\.{1,2}/.+)\\.js$': '$1',
	},
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json', useESM: true }],
	},
	globalSetup: '<rootDir>/tests/integration/globalSetup.ts',
	globalTeardown: '<rootDir>/tests/integration/globalTeardown.ts',
};
