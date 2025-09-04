import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineTokens,
} from '@chakra-ui/react';

export const config = defineConfig({
	theme: {
		semanticTokens: {
			colors: {
				brand: { value: '#121212' },
			},
		},
		recipes: {
			button: defineRecipe({
				variants: {
					variant: {
						outline: {
							borderColor: '#FFF',
							color: '#FFF',
							bg: 'transparent',
							_hover: {
								bg: '#FFF',
								color: '#000',
							},
						},
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
