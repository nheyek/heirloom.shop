import { createSystem, defaultConfig, defineConfig, defineRecipe } from '@chakra-ui/react';

export const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				body: { value: 'Telex' },
				heading: { value: 'Alegreya' },
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
						solid: {
							background: 'brand',
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
