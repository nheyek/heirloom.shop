/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@common/(.*)$': '<rootDir>/common/$1',
	},
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
	},
};
