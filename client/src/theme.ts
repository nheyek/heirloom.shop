import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
} from '@chakra-ui/react';
import {
	CARD_GRID_COLUMN_COUNTS,
	CARD_WIDTH,
	cardGridBreakpointKey,
	MULTI_LINE_HEIGHT,
	SINGLE_LINE_HEIGHT,
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
	xl: 1500,
};

export const CARD_GRID_GAP_PX =
	STANDARD_GRID_GAP * CHAKRA_SPACING_UNIT;

const cardGridWidthForColumns = (columns: number) =>
	columns * CARD_WIDTH +
	(columns - 1) * CARD_GRID_GAP_PX +
	2 * CARD_GRID_GAP_PX;

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

const buttonRecipe = defineRecipe({
	base: {
		borderRadius: 'full',
		width: 'fit-content',
	},
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
		lineHeight: MULTI_LINE_HEIGHT,
	},
});

const HEADING_FONT_SIZES = {
	xs: 24,
	sm: 26,
	md: 28,
	lg: 32,
	xl: 36,
	'2xl': 40,
	'3xl': 44,
	'4xl': 48,
	'5xl': 54,
	'6xl': 60,
	'7xl': 72,
};

const headingRecipe = defineRecipe({
	base: {
		fontWeight: 500,
		lineHeight: SINGLE_LINE_HEIGHT,
		truncate: true,
	},
	variants: {
		size: Object.fromEntries(
			Object.entries(HEADING_FONT_SIZES).map(
				([size, fontSize]) => [
					size,
					{
						textStyle: 'none',
						fontSize,
						lineHeight: SINGLE_LINE_HEIGHT,
					},
				],
			),
		),
	},
	defaultVariants: {
		size: 'lg',
	},
});

const defaultSlotRecipes = defaultConfig.theme!.slotRecipes!;
const selectSlotRecipe = defaultSlotRecipes.select!;

const SELECT_FONT_SIZES = {
	md: 18,
	lg: 20,
};

const SELECT_ITEM_PADDING_X = 4;
const SELECT_ITEM_PADDING_Y = 3;

const selectRecipe = defineSlotRecipe({
	slots: selectSlotRecipe.slots,
	base: {
		label: {
			fontSize: 18,
			fontWeight: 500,
		},
	},
	variants: {
		variant: { subtle: {} },
		size: Object.fromEntries(
			Object.entries(SELECT_FONT_SIZES).map(
				([size, fontSize]) => [
					size,
					{
						content: {
							px: 0,
							py: 2,
						},
						trigger: {
							fontSize,
							py: 3,
						},
						item: {
							fontSize,
							px: SELECT_ITEM_PADDING_X,
							py: SELECT_ITEM_PADDING_Y,
						},
					},
				],
			),
		),
	},
	defaultVariants: {
		variant: 'subtle',
	},
});

const overlayTitleSlotRecipe = (slots: readonly string[]) =>
	defineSlotRecipe({
		slots: [...slots],
		base: {
			title: {
				textStyle: 'none',
				fontWeight: 500,
				fontFamily: DISPLAY_FONT_FAMILY,
				fontSize: HEADING_FONT_SIZES.md,
				lineHeight: SINGLE_LINE_HEIGHT,
				truncate: true,
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
		recipes: {
			button: buttonRecipe,
			text: textRecipe,
			heading: headingRecipe,
		},
		slotRecipes: {
			card: cardRecipe,
			dialog: overlayTitleSlotRecipe(
				defaultSlotRecipes.dialog!.slots,
			),
			drawer: overlayTitleSlotRecipe(
				defaultSlotRecipes.drawer!.slots,
			),
			fieldset: fieldsetRecipe,
			select: selectRecipe,
		},
	},
});

export default createSystem(defaultConfig, config);
