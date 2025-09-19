import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineTokens,
} from '@chakra-ui/react';

export const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				body: { value: 'Noto Sans' },
				heading: { value: 'Noto Serif' },
			},
		},
		semanticTokens: {
			colors: {
				brand: { value: '#121212' },
			},
		},
		recipes: {
			button: defineRecipe({
				variants: {
					variant: {
						plain: {
							color: '#FFF',
							fontWeight: 600,
						},
					},
				},
			}),
			input: defineRecipe({
				variants: {
					size: {
						'2xl': {
							fontSize: '24px',
						},
					},
				},
			}),
		},
	},
});

export default createSystem(defaultConfig, config);
