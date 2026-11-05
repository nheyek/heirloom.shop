import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
	defineTextStyles,
} from '@chakra-ui/react';
import {
	CARD_WIDTH,
	cardGridBreakpointKey,
	CARD_GRID_COLUMN_COUNTS,
	STANDARD_GRID_GAP,
} from '@client/constants';

export const BRAND_COLOR = '#121212';
export const CHAKRA_SPACING_UNIT = 4;
export const DISPLAY_FONT_FAMILY = 'Alegreya';
export const DEFAULT_FONT_FAMILY = 'Alegreya Sans';

export const ANIMATION_NAME = {
	itemGridEnter: 'item-grid-enter',
};

export const SIDEBAR_WIDTH = 250;

const BASE_BREAKPOINTS = {
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

const CARD_GRID_PAGE_PADDING_PX =
	STANDARD_GRID_GAP * CHAKRA_SPACING_UNIT;
export const CARD_GRID_GAP_PX =
	STANDARD_GRID_GAP * CHAKRA_SPACING_UNIT;

const cardGridWidthForColumns = (columns: number) =>
	columns * CARD_WIDTH +
	(columns - 1) * CARD_GRID_GAP_PX +
	2 * CARD_GRID_PAGE_PADDING_PX;

const CARD_GRID_BREAKPOINTS = Object.fromEntries(
	CARD_GRID_COLUMN_COUNTS.flatMap((columns) => [
		[
			cardGridBreakpointKey(columns, false),
			`${cardGridWidthForColumns(columns)}px`,
		],
		[
			cardGridBreakpointKey(columns, true),
			`${cardGridWidthForColumns(columns) + SIDEBAR_WIDTH}px`,
		],
	]),
);

export const BREAKPOINTS = {
	...Object.fromEntries(
		Object.entries(BASE_BREAKPOINTS).map(([key, value]) => [
			key,
			`${value}px`,
		]),
	),
	...CARD_GRID_BREAKPOINTS,
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
		borderRadius: 'full',
		width: 'fit-content',
	},
	defaultVariants: {},
	variants: {
		variant: {
			solid: {
				background: 'colorPalette.solid',
			},
			outline: {
				borderWidth: 2,
				color: BRAND_COLOR,
				borderColor: BRAND_COLOR,
			},
		},
		size: {
			md: { fontSize: 20 },
			lg: { fontSize: 22 },
			xl: { fontSize: 24 },
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
	slots: ['label'],
	base: {
		label: {
			fontSize: 18,
			fontWeight: 500,
		},
	},
});

export const TEXT_STYLES = {
	fieldLabel: 'fieldLabel',
};
const textStyles = defineTextStyles({
	[TEXT_STYLES.fieldLabel]: {
		value: {
			fontSize: 18,
			fontWeight: 500,
		},
	},
});
export const config = defineConfig({
	globalCss: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[`@keyframes ${ANIMATION_NAME.itemGridEnter}`]: {
			from: { opacity: 0 },
			to: { opacity: 1 },
		} as any,
		'html, body': {
			touchAction: 'pan-y',
			minHeight: '100svh',
			overflowAnchor: 'none',
		},
		// Prevents outline on accordion section headers on mobile
		'*:focus': {
			outline: 'none !important',
			boxShadow: 'none !important',
		},
		// Prevents Chakra bug where box shadow doesn't appear correctly on select/menu/popover components
		"[data-scope='select'][data-part='content']": {
			boxShadow: 'md !important',
			transitionProperty: 'opacity, transform',
		},
		"[data-scope='menu'][data-part='content']": {
			boxShadow: 'md !important',
			transitionProperty: 'opacity, transform',
		},
		"[data-scope='popover'][data-part='content']": {
			boxShadow: 'lg !important',
			transitionProperty: 'opacity, transform',
		},
	},
	theme: {
		breakpoints: BREAKPOINTS,
		tokens: {
			spacing: {
				1: { value: `${CHAKRA_SPACING_UNIT}px` },
			},
			fonts: {
				body: { value: DEFAULT_FONT_FAMILY },
				heading: {
					value: DISPLAY_FONT_FAMILY,
				},
			},
		},
		semanticTokens: {
			colors: {
				brand: {
					DEFAULT: { value: BRAND_COLOR },
					solid: { value: BRAND_COLOR },
				},
			},
		},
		textStyles,
		recipes: {
			input: inputRecipe,
			button: buttonRecipe,
			card: cardRecipe,
			text: textRecipe,
		},
		slotRecipes: {
			card: cardRecipe,
			fieldset: fieldsetRecipe,
			select: selectRecipe,
		},
	},
});

export default createSystem(defaultConfig, config);
