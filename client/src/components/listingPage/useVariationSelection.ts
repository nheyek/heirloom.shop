import { createListCollection } from '@chakra-ui/react';
import { ListingPageData } from '@heirloom/common/contract';
import {
	isVariationOptionDisabled,
	resolveEffectiveCombinationImage,
} from '@heirloom/common/domain/listing';
import { useEffect, useState } from 'react';

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
	const [selectedVariationOptions, setSelectedVariationOptions] =
		useState<Record<string, string>>({});

	useEffect(() => {
		setSelectedVariationOptions({});
	}, [listingData]);

	const selectOption = (variationId: string, optionId: string) => {
		setSelectedVariationOptions({
			...selectedVariationOptions,
			[variationId]: optionId,
		});
	};

	const effectiveImageUuid = listingData
		? resolveEffectiveCombinationImage(
				selectedVariationOptions,
				listingData.combinations,
				listingData.variations,
			)
		: null;

	// Effective image first, then the rest in their original order.
	const orderedImageUuids = listingData
		? effectiveImageUuid
			? [
					effectiveImageUuid,
					...listingData.imageUuids.filter(
						(uuid) => uuid !== effectiveImageUuid,
					),
				]
			: listingData.imageUuids
		: [];

	const variationCollections: VariationCollection[] = listingData
		? Object.entries(listingData.variations)
				.sort(([, a], [, b]) => a.order - b.order)
				.map(([varId, variation]) => ({
					id: varId,
					name: variation.name,
					collection: createListCollection({
						items: Object.entries(variation.options)
							.sort(
								([, a], [, b]) => a.order - b.order,
							)
							.map(([optId, option]) => ({
								value: optId,
								label: option.name,
								disabled: isVariationOptionDisabled(
									varId,
									optId,
									selectedVariationOptions,
									listingData.variations,
									listingData.combinations,
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
		effectiveImageUuid,
		orderedImageUuids,
		variationCollections,
		allVariationsSelected,
	};
};
