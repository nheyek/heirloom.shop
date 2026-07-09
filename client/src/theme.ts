import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
} from '@chakra-ui/react';

export const COLOR_BRAND = '#121212';
export const FIELD_ERROR_COLOR = '#df1b41';
export const CHAKRA_SPACING_UNIT = 4;
export const FONT_DEFAULT = 'Roboto';
export const FONT_DECORATIVE = 'Alegreya';
export const FONT_DISPLAY_SANS = 'Alegreya Sans';

export const NAVBAR_HEIGHT = {
	DESKTOP: 16, // Spacing units
	MOBILE: 110, // Pixels
};
export const SIDEBAR_WIDTH_PX = 250;

const BASE_BREAKPOINTS = {
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

export const sidebarBreakpoint = {
	sm: 'sm_sb',
	md: 'md_sb',
	lg: 'lg_sb',
	xl: 'xl_sb',
	'2xl': '2xl_sb',
};

export const SIDEBAR_GRID_COLUMNS = {
	base: 1,
	[sidebarBreakpoint.sm]: 2,
	[sidebarBreakpoint.md]: 3,
	[sidebarBreakpoint.xl]: 4,
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
			`${value + SIDEBAR_WIDTH_PX}px`,
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
	defaultVariants: {},
	variants: {
		variant: {
			solid: {
				background: 'colorPalette.solid',
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

const textRecipe = defineRecipe({
	base: {
		lineHeight: 1.25,
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
			minHeight: '200svh',
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
				brand: {
					DEFAULT: { value: COLOR_BRAND },
					solid: { value: COLOR_BRAND },
				},
			},
		},
		recipes: {
			input: inputRecipe,
			button: buttonRecipe,
			card: cardRecipe,
			text: textRecipe,
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
