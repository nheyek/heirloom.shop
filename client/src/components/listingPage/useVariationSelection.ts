import { createListCollection } from '@chakra-ui/react';
import { ListingPageData } from '@heirloom/common/contract';
import {
	getDefaultOptionSelection,
	getOrderedListingImageUuids,
	isVariationOptionDisabled,
} from '@heirloom/common/domain/listing';
import { useMemo, useState } from 'react';

export type VariationCollectionItem = {
	value: string;
	label: string;
	disabled: boolean;
};

export type VariationCollection = {
	id: string;
	name: string;
	collection: ReturnType<
		typeof createListCollection<VariationCollectionItem>
	>;
};

export const useVariationSelection = (
	listingData: ListingPageData | null,
) => {
	const [userSelection, setUserSelection] = useState<{
		listingShortId: string;
		options: Record<string, string>;
	} | null>(null);

	const defaultOptions = useMemo(
		() =>
			listingData
				? getDefaultOptionSelection(listingData)
				: null,
		[listingData],
	);

	const selectedVariationOptions =
		userSelection &&
		userSelection.listingShortId === listingData?.shortId
			? userSelection.options
			: (defaultOptions?.selection ?? {});

	const selectOption = (variationId: string, optionId: string) => {
		if (!listingData) return;
		setUserSelection({
			listingShortId: listingData.shortId,
			options: {
				...selectedVariationOptions,
				[variationId]: optionId,
			},
		});
	};

	const orderedImageUuids = listingData
		? getOrderedListingImageUuids(
				listingData,
				selectedVariationOptions,
			)
		: [];

	const variationCollections: VariationCollection[] = listingData
		? Object.entries(listingData.variations)
				.sort(([, a], [, b]) => a.order - b.order)
				.map(([varId, variation]) => ({
					id: varId,
					name: variation.name,
					collection: createListCollection({
						items: Object.entries(variation.options)
							.sort(([, a], [, b]) => a.order - b.order)
							.map(([optId, option]) => ({
								value: optId,
								label: option.name,
								disabled: isVariationOptionDisabled(
									varId,
									optId,
									selectedVariationOptions,
									listingData,
								),
							})),
					}),
				}))
		: [];

	const allVariationsSelected = listingData
		? Object.keys(listingData.variations).every(
				(id) => selectedVariationOptions[id] != null,
			)
		: false;

	return {
		selectedVariationOptions,
		selectOption,
		hasAvailableOption: defaultOptions?.isAvailable ?? true,
		orderedImageUuids,
		variationCollections,
		allVariationsSelected,
	};
};
