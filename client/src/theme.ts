import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
} from '@chakra-ui/react';

export const COLOR_BRAND = '#121212';
export const CHAKRA_SPACING_UNIT = 4;
export const FONT_DEFAULT = 'Roboto';
export const FONT_DECORATIVE = 'Alegreya';
export const FONT_DISPLAY_SANS = 'Alegreya Sans';

export const SIDEBAR_WIDTH_PX = 300;
export const ACCOUNT_PAGE_PADDING = 5; // Chakra spacing units
const ACCOUNT_PAGE_PADDING_PX =
	ACCOUNT_PAGE_PADDING * CHAKRA_SPACING_UNIT;
const SIDEBAR_CONTENT_OFFSET_PX =
	SIDEBAR_WIDTH_PX + 2 * ACCOUNT_PAGE_PADDING_PX;

const BASE_BREAKPOINTS = {
	sm: 480,
	md: 768,
	lg: 992,
	xl: 1280,
	'2xl': 1536,
};

export const sidebarBreakpoint = {
	sm: 'sm_sb',
	md: 'md_sb',
	lg: 'lg_sb',
	xl: 'xl_sb',
	'2xl': '2xl_sb',
};

export const breakpoints = {
	...Object.fromEntries(
		Object.entries(BASE_BREAKPOINTS).map(([key, value]) => [
			key,
			`${value}px`,
		]),
	),
	...Object.fromEntries(
		Object.entries(BASE_BREAKPOINTS).map(([key, value]) => [
			`${key}_sb`,
			`${value + SIDEBAR_CONTENT_OFFSET_PX}px`,
		]),
	),
};

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
				root: { spaceY: 3 },
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
			paddingBottom: 'env(safe-area-inset-bottom)',
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
		breakpoints,
		tokens: {
			spacing: {
				1: { value: `${CHAKRA_SPACING_UNIT}px` },
			},
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
			fieldset: fieldsetRecipe,
			menu: menuRecipe,
			select: selectRecipe,
		},
	},
});

export default createSystem(defaultConfig, config);
