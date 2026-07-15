/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	extensionsToTreatAsEsm: ['.ts'],
	testEnvironment: 'node',
	// Not anchored to <rootDir> for the integration-tests pattern: nested
	// copies of this repo (e.g. background-task git worktrees under
	// .claude/worktrees/<name>/tests/integration/) don't share that exact
	// path prefix, so an anchored pattern silently fails to exclude them —
	// matching the bare "/tests/integration/" substring catches those too.
	// The worktrees pattern additionally excludes their unit tests, since a
	// worktree's copy of this repo is a different, transient workspace, not
	// part of this run.
	testPathIgnorePatterns: [
		'/node_modules/',
		'/tests/integration/',
		'/\\.claude/worktrees/',
	],
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
};
