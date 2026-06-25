export type VariationOption = {
	name: string;
	order: number;
};

export type Variation = {
	name: string;
	pricesVary: boolean;
	options: Record<string, VariationOption>;
	order: number;
};

export type Combination = {
	priceCents: number | null;
	upc: string;
	imageUuid: string | null;
	disabled: boolean;
};

export type Variations = Record<string, Variation>;
export type Combinations = Record<string, Combination>;

export const DEFAULT_COMBINATION: Combination = {
	priceCents: null,
	upc: '',
	imageUuid: null,
	disabled: false,
};

/**
 * Stable canonical key for a combination: variationId:optionId pairs
 * sorted lexicographically by variationId, joined with |.
 * Stable under variation/option reordering.
 */
export const combinationKey = (
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

/**
 * Derive the ordered display list of combinations from current variations.
 * Order follows variation.order and option.order — purely for UI rendering.
 */
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
		key: combinationKey(optionMap),
		optionMap,
	}));
};

/**
 * Expand combinations when a new variation is added.
 * Each existing combination is cloned once per new option.
 * If there are no existing combinations, seeds one entry per option.
 */
export const addVariationToCombinations = (
	combinations: Combinations,
	newVarId: string,
	newOptionIds: string[],
): Combinations => {
	const existing = Object.entries(combinations);
	if (existing.length === 0) {
		return Object.fromEntries(
			newOptionIds.map((optId) => [
				combinationKey({ [newVarId]: optId }),
				{ ...DEFAULT_COMBINATION },
			]),
		);
	}
	const result: Combinations = {};
	for (const [key, data] of existing) {
		const optionMap = parseCombinationKey(key);
		for (const optId of newOptionIds) {
			result[
				combinationKey({ ...optionMap, [newVarId]: optId })
			] = { ...data };
		}
	}
	return result;
};

/**
 * Collapse combinations when a variation is removed.
 * Combinations that become identical after removal are reset to defaults
 * (first one encountered keeps its data, subsequent duplicates are reset).
 */
export const removeVariationFromCombinations = (
	combinations: Combinations,
	varId: string,
): Combinations => {
	const result: Combinations = {};
	for (const [key, data] of Object.entries(combinations)) {
		const optionMap = parseCombinationKey(key);
		delete optionMap[varId];
		const newKey = combinationKey(optionMap);
		result[newKey] =
			newKey in result ? { ...DEFAULT_COMBINATION } : data;
	}
	return result;
};

/**
 * Expand combinations when a new option is added to an existing variation.
 * One new combination is created per existing combination, with the new option substituted in.
 */
export const addOptionToCombinations = (
	combinations: Combinations,
	varId: string,
	newOptId: string,
): Combinations => {
	const result = { ...combinations };
	const seen = new Set<string>();
	for (const key of Object.keys(combinations)) {
		const newKey = combinationKey({
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

/**
 * Remove all combinations that include the given option.
 */
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

/**
 * Sync combinations after a variation's options are edited.
 * Applies removals first, then additions, preserving data for unchanged combinations.
 */
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
