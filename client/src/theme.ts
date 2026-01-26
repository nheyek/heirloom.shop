import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
	defineSlotRecipe,
	defineTextStyles,
} from '@chakra-ui/react';
import { fieldAnatomy, selectAnatomy } from '@chakra-ui/react/anatomy';

const standardDisplayFont = 'Bitter';
const ornamentalFont = 'Alegreya';
const sansSerifFont = 'Telex';

export const textStyles = defineTextStyles({
	clean: {
		value: {
			fontFamily: sansSerifFont,
		},
	},
	ornamental: {
		value: {
			fontFamily: ornamentalFont,
		},
	},
});

const selectSlotRecipe = defineSlotRecipe({
	slots: selectAnatomy.keys(),
	base: {
		trigger: { fontFamily: sansSerifFont },
		label: { fontFamily: sansSerifFont },
		item: { fontFamily: sansSerifFont },
	},
});

const fieldSlotRecipe = defineSlotRecipe({
	slots: fieldAnatomy.keys(),
	base: {
		label: { fontFamily: sansSerifFont },
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
		'*': {
			WebkitTapHighlightColor: 'transparent',
			textSizeAdjust: '100%',
		},
		'*:focus:not(:focus-visible)': {
			outline: 'none',
			boxShadow: 'none',
		},
	},
	theme: {
		tokens: {
			fonts: {
				body: { value: standardDisplayFont },
				heading: { value: ornamentalFont },
			},
		},
		semanticTokens: {
			colors: {
				brand: { value: '#121212' },
			},
		},
		slotRecipes: {
			select: selectSlotRecipe,
			field: fieldSlotRecipe,
		},
		recipes: {
			input: inputRecipe,
			button: buttonRecipe,
		},
		textStyles,
	},
});

export default createSystem(defaultConfig, config);
