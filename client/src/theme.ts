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
const sansSerifFont = 'Alegreya Sans SC';

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
		fontFamily: sansSerifFont,
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
				color: brandColor,
				borderColor: brandColor,
			},
		},
	},
});

const cardRecipe = defineSlotRecipe({
	slots: ['root'],
	base: {
		root: {
			overflow: 'hidden',
		},
	},
});

const menuRecipe = defineSlotRecipe({
	slots: ['item'],
	base: {
		item: {
			fontFamily: sansSerifFont,
		},
	},
});

const selectRecipe = defineSlotRecipe({
	slots: ['label', 'trigger', 'item'],
	base: {
		label: {
			fontSize: 20,
			fontWeight: 500,
			fontFamily: sansSerifFont,
		},
		trigger: {
			fontSize: 18,
			fontWeight: 500,
		},
		item: {
			fontSize: 18,
			fontWeight: 500,
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
		// Prevents outline on accordion section headers on mobile
		'*:focus': {
			outline: 'none !important',
			boxShadow: 'none !important',
		},
		// Prevents Chakra bug where box shadow doesn't appear correctly on select option menu
		"[data-scope='select'][data-part='content']": {
			boxShadow: 'lg !important',
			transitionProperty: 'opacity, transform',
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
			select: selectRecipe,
		},
		textStyles,
	},
});

export default createSystem(defaultConfig, config);
