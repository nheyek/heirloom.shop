export type VariationOption = {
	name: string;
	order: number;
	priceCents: number | null;
	imageUuid: string | null;
};

export type Variation = {
	name: string;
	pricesVary: boolean;
	options: Record<string, VariationOption>;
	order: number;
};

export type Combination = {
	priceCents: number | null;
	imageUuid: string | null;
	disabled: boolean;
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
			const opt = newOptions[optId];
			result[getCombinationKey({ ...optionMap, [newVarId]: optId })] = {
				...data,
				...(newVariationPricesVary ? { priceCents: null } : {}),
				...(opt.imageUuid != null ? { imageUuid: null } : {}),
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
	if (combinations[key]?.priceCents != null) return combinations[key].priceCents;
	const sorted = Object.entries(variations)
		.filter(([, v]) => v.pricesVary)
		.sort(([, a], [, b]) => a.order - b.order);
	for (const [varId, v] of sorted) {
		const price = v.options[optionMap[varId]]?.priceCents ?? null;
		if (price != null) return price;
	}
	return basePriceCents;
};

export const resolveEffectiveCombinationImage = (
	optionMap: Record<string, string>,
	combinations: Combinations,
	variations: Variations,
): string | null => {
	const key = getCombinationKey(optionMap);
	if (combinations[key]?.imageUuid != null) return combinations[key].imageUuid;
	const sorted = Object.entries(variations).sort(([, a], [, b]) => a.order - b.order);
	for (const [varId, v] of sorted) {
		const img = v.options[optionMap[varId]]?.imageUuid ?? null;
		if (img != null) return img;
	}
	return null;
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
