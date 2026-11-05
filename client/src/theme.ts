import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
	defineTextStyles,
} from '@chakra-ui/react';
import { CARD_WIDTH, STANDARD_GRID_GAP } from '@client/constants';

export const brandColor = '#121212';
export const fieldErrorColor = '#df1b41';
export const chakraSpacingUnit = 4;
export const sansFontFamily = 'Roboto';
export const displayFontFamily = 'Alegreya';
export const defaultFontFamily = 'Alegreya Sans';

export const animationName = {
	itemGridEnter: 'item-grid-enter',
};

export const navbarHeight = 65;
export const scrollTargetOffset =
	navbarHeight + 2 * chakraSpacingUnit;
export const sidebarWidth = 250;

const baseBreakpoints = {
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

const CARD_GRID_MAX_COLUMNS = 4;
const cardGridPagePaddingPx = STANDARD_GRID_GAP * chakraSpacingUnit;
export const cardGridGapPx = STANDARD_GRID_GAP * chakraSpacingUnit;

const cardGridWidthForColumns = (columns: number) =>
	columns * CARD_WIDTH +
	(columns - 1) * cardGridGapPx +
	2 * cardGridPagePaddingPx;

const cardGridColumnCounts = Array.from(
	{ length: CARD_GRID_MAX_COLUMNS - 1 },
	(_, i) => i + 2,
);

const cardGridBreakpoints = Object.fromEntries(
	cardGridColumnCounts.flatMap((columns) => [
		[
			`cardCols${columns}`,
			`${cardGridWidthForColumns(columns)}px`,
		],
		[
			`cardCols${columns}_sb`,
			`${cardGridWidthForColumns(columns) + sidebarWidth}px`,
		],
	]),
);

export const cardGridColumns = {
	base: 1,
	...Object.fromEntries(
		cardGridColumnCounts.map((columns) => [
			`cardCols${columns}`,
			columns,
		]),
	),
};

export const sidebarCardGridColumns = {
	base: 1,
	...Object.fromEntries(
		cardGridColumnCounts.map((columns) => [
			`cardCols${columns}_sb`,
			columns,
		]),
	),
};

export const breakpoints = {
	...Object.fromEntries(
		Object.entries(baseBreakpoints).map(([key, value]) => [
			key,
			`${value}px`,
		]),
	),
	...cardGridBreakpoints,
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
				color: brandColor,
				borderColor: brandColor,
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
		[`@keyframes ${animationName.itemGridEnter}`]: {
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
		breakpoints,
		tokens: {
			spacing: {
				1: { value: `${chakraSpacingUnit}px` },
			},
			fonts: {
				body: { value: defaultFontFamily },
				heading: {
					value: displayFontFamily,
				},
			},
		},
		semanticTokens: {
			colors: {
				brand: {
					DEFAULT: { value: brandColor },
					solid: { value: brandColor },
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
