import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
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
		borderRadius: 'full',
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

const cardRecipe = defineSlotRecipe({
	slots: ['root', 'header', 'body', 'footer'],
	base: {
		root: {
			overflow: 'hidden',
		},
	},
});

export const config = defineConfig({
	globalCss: {
		'html, body': {
			touchAction: 'pan-y',
			height: '100vh',
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
				heading: {
					value: ornamentalFont,
				},
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
			card: cardRecipe,
		},
		slotRecipes: {
			card: cardRecipe,
		},
		textStyles,
	},
});

export default createSystem(defaultConfig, config);
