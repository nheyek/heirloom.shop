/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	testEnvironment: 'node',
	testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
	moduleNameMapper: {
		'^@common/(.*)$': '<rootDir>/common/$1',
	},
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
	},
	globalSetup: '<rootDir>/tests/integration/globalSetup.ts',
	globalTeardown: '<rootDir>/tests/integration/globalTeardown.ts',
	setupFiles: ['<rootDir>/tests/integration/setup.ts'],
};
