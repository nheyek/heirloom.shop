import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	prettierConfig,
	{
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'@stylistic/padding-line-between-statements': [
				'warn',
				{ blankLine: 'always', prev: 'function', next: '*' },
				{ blankLine: 'always', prev: '*', next: 'function' },
				{ blankLine: 'always', prev: 'multiline-const', next: 'multiline-const' },
			],
		},
	},
);
