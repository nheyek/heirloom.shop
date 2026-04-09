/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '<rootDir>/tests/integration/'],
	moduleNameMapper: {
		'^@common/(.*)$': '<rootDir>/common/$1',
		'^@server/(.*)$': '<rootDir>/server/src/$1',
		'^@client/(.*)$': '<rootDir>/client/src/$1',
	},
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
	},
};
