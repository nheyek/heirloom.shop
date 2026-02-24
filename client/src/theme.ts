import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
} from '@chakra-ui/react';

export const COLOR_BRAND = '#121212';
export const FONT_DEFAULT = 'Roboto';
export const FONT_DECORATIVE = 'Alegreya';
export const FONT_DISPLAY_SANS = 'Alegreya Sans';

const inputRecipe = defineRecipe({
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
		fontFamily: FONT_DISPLAY_SANS,
		borderRadius: 'full',
	},
	variants: {
		variant: {
			solid: {
				background: 'brand',
			},
			outline: {
				borderWidth: 2,
				color: COLOR_BRAND,
				borderColor: COLOR_BRAND,
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
			fontFamily: FONT_DISPLAY_SANS,
		},
	},
});

const fieldsetRecipe = defineSlotRecipe({
	slots: ['root', 'content'],
	variants: {
		size: {
			lg: {
				root: { spaceY: 2 },
				content: { gap: 2 },
			},
		},
	},
});

const drawerRecipe = defineSlotRecipe({
	slots: ['content'],
	variants: {
		size: {
			sm: {
				content: { maxW: 375 },
			},
		},
	},
});

const selectRecipe = defineSlotRecipe({
	slots: ['label', 'item'],
	base: {
		label: {
			fontFamily: FONT_DISPLAY_SANS,
			fontSize: 18,
			fontWeight: 500,
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
		// Prevents Chakra bug where box shadow doesn't appear correctly on select/menu components
		"[data-scope='select'][data-part='content']": {
			boxShadow: 'md !important',
			transitionProperty: 'opacity, transform',
		},
		"[data-scope='menu'][data-part='content']": {
			boxShadow: 'md !important',
			transitionProperty: 'opacity, transform',
		},
	},
	theme: {
		tokens: {
			fonts: {
				body: { value: FONT_DEFAULT },
				heading: {
					value: FONT_DECORATIVE,
				},
			},
		},
		semanticTokens: {
			colors: {
				brand: { value: COLOR_BRAND },
			},
		},
		recipes: {
			input: inputRecipe,
			button: buttonRecipe,
			card: cardRecipe,
		},
		slotRecipes: {
			card: cardRecipe,
			drawer: drawerRecipe,
			fieldset: fieldsetRecipe,
			menu: menuRecipe,
			select: selectRecipe,
		},
	},
});

export default createSystem(defaultConfig, config);
