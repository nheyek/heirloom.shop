import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
	defineTextStyles,
} from '@chakra-ui/react';

const brandColor = '#121212';
const ornamentalFont = 'Alegreya';
const standardFont = 'Bitter';
const sansSerifFont = 'Nunito';

export const textStyles = defineTextStyles({
	ornamental: {
		value: {
			fontFamily: ornamentalFont,
		},
	},
	sans: {
		value: {
			fontFamily: sansSerifFont,
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
		fontFamily: sansSerifFont,
		borderRadius: 'full',
	},
	variants: {
		variant: {
			solid: {
				background: 'brand',
			},
			outline: {
				borderWidth: 2,
				borderColor: '#000',
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

const menuRecipe = defineSlotRecipe({
	slots: ['root', 'content', 'item'],
	base: {
		item: {
			fontFamily: sansSerifFont,
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
				brand: { value: brandColor },
			},
		},
		recipes: {
			input: inputRecipe,
			button: buttonRecipe,
			card: cardRecipe,
		},
		slotRecipes: {
			card: cardRecipe,
			menu: menuRecipe,
		},
		textStyles,
	},
});

export default createSystem(defaultConfig, config);
