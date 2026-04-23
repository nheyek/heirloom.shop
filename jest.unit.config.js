/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	extensionsToTreatAsEsm: ['.ts'],
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '<rootDir>/tests/integration/'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
		'^@common/(.*)$': '<rootDir>/common/$1',
		'^@server/(.*)$': '<rootDir>/server/src/$1',
		'^@client/(.*)$': '<rootDir>/client/src/$1',
	},
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json', useESM: true }],
	},
};
