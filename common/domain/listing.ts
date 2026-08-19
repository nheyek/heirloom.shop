import { ReturnPolicyType } from '../constants.js';

export const HEIRLOOM_LISTING_PROFILES = {
	processing: {
		minDays: 0,
		maxDays: 2,
	},
	shipping: {
		originZip: '60622',
		shippingDaysMin: 3,
		shippingDaysMax: 5,
		shippingRate: 0,
	},
	returns: {
		policyType: ReturnPolicyType.STANDARD,
		returnWindowDays: 30,
	},
};

export type VariationOption = {
	name: string;
	order: number;
	priceCents: number | null;
	imageUuid: string | null;
};

export type Variation = {
	name: string;
	pricesVary: boolean;
	imagesVary: boolean;
	options: Record<string, VariationOption>;
	order: number;
};

export type Combination = {
	priceCents: number | null;
	imageUuid: string | null;
	disabled: boolean;
	inventory?: number | null;
};

export type Variations = Record<string, Variation>;
export type Combinations = Record<string, Combination>;

export const DEFAULT_COMBINATION: Combination = {
	priceCents: null,
	imageUuid: null,
	disabled: false,
};

export const getCombinationKey = (
	optionMap: Record<string, string>,
): string =>
	Object.entries(optionMap)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([vId, oId]) => `${vId}:${oId}`)
		.join('|');

export const parseCombinationKey = (
	key: string,
): Record<string, string> => {
	if (!key) return {};
	return Object.fromEntries(
		key.split('|').map((s) => {
			const i = s.indexOf(':');
			return [s.slice(0, i), s.slice(i + 1)];
		}),
	);
};

export const deriveCombinationsList = (
	variations: Variations,
): { key: string; optionMap: Record<string, string> }[] => {
	const sorted = Object.entries(variations).sort(
		([, a], [, b]) => a.order - b.order,
	);
	if (sorted.length === 0) return [];

	const optionArrays = sorted.map(([varId, v]) => ({
		varId,
		optIds: Object.entries(v.options)
			.sort(([, a], [, b]) => a.order - b.order)
			.map(([id]) => id),
	}));

	if (optionArrays.some((a) => a.optIds.length === 0)) return [];

	let optionMaps: Record<string, string>[] = [{}];
	for (const { varId, optIds } of optionArrays) {
		optionMaps = optionMaps.flatMap((existing) =>
			optIds.map((optId) => ({ ...existing, [varId]: optId })),
		);
	}

	return optionMaps.map((optionMap) => ({
		key: getCombinationKey(optionMap),
		optionMap,
	}));
};

export const addVariationToCombinations = (
	combinations: Combinations,
	newVarId: string,
	newOptions: Record<string, VariationOption>,
	newVariationPricesVary: boolean,
	newVariationImagesVary: boolean,
): Combinations => {
	const newOptionIds = Object.keys(newOptions);
	const existing = Object.entries(combinations);
	if (existing.length === 0) {
		return Object.fromEntries(
			newOptionIds.map((optId) => [
				getCombinationKey({ [newVarId]: optId }),
				{ ...DEFAULT_COMBINATION },
			]),
		);
	}
	const result: Combinations = {};
	for (const [key, data] of existing) {
		const optionMap = parseCombinationKey(key);
		for (const optId of newOptionIds) {
			result[
				getCombinationKey({ ...optionMap, [newVarId]: optId })
			] = {
				...data,
				...(newVariationPricesVary
					? { priceCents: null }
					: {}),
				...(newVariationImagesVary
					? { imageUuid: null }
					: {}),
			};
		}
	}
	return result;
};

export const removeVariationFromCombinations = (
	combinations: Combinations,
	varId: string,
): Combinations => {
	const result: Combinations = {};
	for (const [key, data] of Object.entries(combinations)) {
		const optionMap = parseCombinationKey(key);
		delete optionMap[varId];
		const newKey = getCombinationKey(optionMap);
		result[newKey] =
			newKey in result ? { ...DEFAULT_COMBINATION } : data;
	}
	return result;
};

export const addOptionToCombinations = (
	combinations: Combinations,
	varId: string,
	newOptId: string,
): Combinations => {
	const result = { ...combinations };
	const seen = new Set<string>();
	for (const key of Object.keys(combinations)) {
		const newKey = getCombinationKey({
			...parseCombinationKey(key),
			[varId]: newOptId,
		});
		if (!seen.has(newKey)) {
			seen.add(newKey);
			result[newKey] = { ...DEFAULT_COMBINATION };
		}
	}
	return result;
};

export const removeOptionFromCombinations = (
	combinations: Combinations,
	varId: string,
	optId: string,
): Combinations =>
	Object.fromEntries(
		Object.entries(combinations).filter(
			([key]) => parseCombinationKey(key)[varId] !== optId,
		),
	);

export const resolveEffectiveCombinationPrice = (
	optionMap: Record<string, string>,
	combinations: Combinations,
	variations: Variations,
	basePriceCents: number | null,
): number | null => {
	const key = getCombinationKey(optionMap);
	if (combinations[key]?.priceCents != null)
		return combinations[key].priceCents;
	const sorted = Object.entries(variations)
		.filter(([, v]) => v.pricesVary)
		.sort(([, a], [, b]) => a.order - b.order);
	for (const [varId, v] of sorted) {
		const price = v.options[optionMap[varId]]?.priceCents ?? null;
		if (price != null) return price;
	}
	return basePriceCents;
};

export type ListingDisplayPrice = {
	priceCents: number;
	// True when the price is the lowest of several possible combination
	// prices rather than an exact price (rendered with a trailing "+").
	isMinimum: boolean;
} | null;

// Personalization (e.g. engraving) is an opt-in add-on rather than part of
// a listing's intrinsic combination pricing. It's folded into
// getListingDisplayPrice — the single method for computing a listing's
// price — as a final surcharge step, rather than a separate function
// callers could forget to apply.
export type PersonalizationSelection = {
	costCents: number | null | undefined;
	selected: boolean;
} | null;

const applyPersonalizationCost = (
	priceCents: number,
	personalization: PersonalizationSelection,
): number =>
	personalization?.selected && personalization.costCents != null
		? priceCents + personalization.costCents
		: priceCents;

export const getListingDisplayPrice = (
	variations: Variations,
	combinations: Combinations,
	basePriceCents: number | null,
	selectedOptions: Record<string, string> = {},
	personalization: PersonalizationSelection = null,
): ListingDisplayPrice => {
	const pricesVary = Object.values(variations).some(
		(v) => v.pricesVary,
	);
	if (!pricesVary) {
		return basePriceCents != null
			? {
					priceCents: applyPersonalizationCost(
						basePriceCents,
						personalization,
					),
					isMinimum: false,
				}
			: null;
	}
	// Only combinations consistent with the current selections can still
	// be purchased, so the floor is the cheapest of those. The price is
	// exact (not a minimum) when every reachable combination costs the
	// same — e.g. once all price-sensitive variations are selected.
	let min: number | null = null;
	let max: number | null = null;
	for (const { key, optionMap } of deriveCombinationsList(
		variations,
	)) {
		if (combinations[key]?.disabled) continue;
		const matchesSelection = Object.entries(
			selectedOptions,
		).every(
			([varId, optId]) =>
				optionMap[varId] == null ||
				optionMap[varId] === optId,
		);
		if (!matchesSelection) continue;
		const price = resolveEffectiveCombinationPrice(
			optionMap,
			combinations,
			variations,
			basePriceCents,
		);
		if (price == null) continue;
		if (min === null || price < min) min = price;
		if (max === null || price > max) max = price;
	}
	return min != null
		? {
				priceCents: applyPersonalizationCost(
					min,
					personalization,
				),
				isMinimum: min !== max,
			}
		: null;
};

export const resolveEffectiveCombinationImage = (
	optionMap: Record<string, string>,
	combinations: Combinations,
	variations: Variations,
): string | null => {
	const key = getCombinationKey(optionMap);
	if (combinations[key]?.imageUuid != null)
		return combinations[key].imageUuid;
	const sorted = Object.entries(variations)
		.filter(([, v]) => v.imagesVary)
		.sort(([, a], [, b]) => a.order - b.order);
	for (const [varId, v] of sorted) {
		const img = v.options[optionMap[varId]]?.imageUuid ?? null;
		if (img != null) return img;
	}
	return null;
};

// An option is only known to be unavailable once every other variation has
// a selection — before that the combination key is incomplete, so we can't
// yet tell which combination it would resolve to.
export const isVariationOptionDisabled = (
	varId: string,
	optionId: string,
	selectedOptions: Record<string, string>,
	variations: Variations,
	combinations: Combinations,
): boolean => {
	const othersSelected = Object.keys(variations)
		.filter((id) => id !== varId)
		.every((id) => selectedOptions[id] != null);
	if (!othersSelected) return false;

	const key = getCombinationKey({
		...selectedOptions,
		[varId]: optionId,
	});
	return combinations[key]?.disabled ?? true;
};

export const isValidCombinationSelection = (
	selectedOptions: Record<string, string>,
	variations: Variations,
	combinations: Combinations,
): boolean => {
	const variationIds = Object.keys(variations);
	if (variationIds.length === 0) return true;

	for (const varId of variationIds) {
		const optionId = selectedOptions[varId];
		if (!optionId || !variations[varId].options[optionId])
			return false;
	}
	const key = getCombinationKey(selectedOptions);
	return !(combinations[key]?.disabled ?? true);
};

export const syncVariationOptions = (
	combinations: Combinations,
	varId: string,
	oldOptionIds: string[],
	newOptionIds: string[],
): Combinations => {
	const oldSet = new Set(oldOptionIds);
	const newSet = new Set(newOptionIds);
	const removed = oldOptionIds.filter((id) => !newSet.has(id));
	const added = newOptionIds.filter((id) => !oldSet.has(id));

	let result = combinations;
	for (const optId of removed) {
		result = removeOptionFromCombinations(result, varId, optId);
	}
	for (const optId of added) {
		result = addOptionToCombinations(result, varId, optId);
	}
	return result;
};
