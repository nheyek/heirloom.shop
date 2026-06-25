import { Variation } from '@client/hooks/useListingForm';

export const deriveCombinations = (
	variations: Record<string, Variation>,
): {
	key: string;
	optionIdsByVariationId: Record<string, string>;
}[] => {
	const sorted = Object.entries(variations).sort(
		(a, b) => a[1].order - b[1].order,
	);
	if (sorted.length === 0) return [];

	// Build ordered option arrays per variation
	const optionArrays = sorted.map(([varId, v]) => {
		const opts = Object.entries(v.options).sort(
			(a, b) => a[1].order - b[1].order,
		);
		return { varId, optIds: opts.map(([id]) => id) };
	});

	if (optionArrays.some((a) => a.optIds.length === 0)) return [];

	// Cartesian product
	let combos: Record<string, string>[] = [{}];
	for (const { varId, optIds } of optionArrays) {
		combos = combos.flatMap((combo) =>
			optIds.map((optId) => ({ ...combo, [varId]: optId })),
		);
	}

	return combos.map((optionIdsByVariationId) => {
		// Key = variation-sorted option IDs joined with |
		const key = sorted
			.map(([varId]) => optionIdsByVariationId[varId])
			.join('|');
		return { key, optionIdsByVariationId };
	});
};
