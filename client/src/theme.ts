import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineTextStyles,
} from '@chakra-ui/react';

const ornamentalFont = 'Alegreya';
const standardFont = 'Bitter';

export const textStyles = defineTextStyles({
	ornamental: {
		value: {
			fontFamily: ornamentalFont,
		},
	},
});

const inputRecipe = defineRecipe({
	base: {
		fontFamily: standardFont,
	},
	variants: {
		size: {
			'2xl': {
				fontSize: '24px',
			},
		},
	},
});

const buttonRecipe = defineRecipe({
	base: {
		fontFamily: standardFont,
		fontWeight: 'bold',
	},
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
});

export const config = defineConfig({
	globalCss: {
		'html, body': {
			touchAction: 'pan-y',
		},
		'*:focus': {
			outline: 'none !important',
			boxShadow: 'none !important',
		},
	},
	theme: {
		tokens: {
			fonts: {
				body: { value: standardFont },
				heading: { value: ornamentalFont },
			},
		},
		semanticTokens: {
			colors: {
				brand: { value: '#121212' },
			},
		},
		recipes: {
			input: inputRecipe,
			button: buttonRecipe,
		},
		textStyles,
	},
});

export default createSystem(defaultConfig, config);
