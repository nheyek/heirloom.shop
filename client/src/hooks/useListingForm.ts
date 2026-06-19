import { useApiClient } from '@client/hooks/useApiClient';
import { useImageUpload, ImageEntry } from '@client/hooks/useImageUpload';
import { callApi } from '@client/utils/apiUtils';
import { ListingDescrSection } from '@heirloom/common/contract';
import { useState } from 'react';

export type { ImageEntry, ListingDescrSection };

export type VariationOption = {
	name: string;
	order: number;
};

export type Variation = {
	name: string;
	pricesVary: boolean;
	leadTimesVary: boolean;
	options: Record<string, VariationOption>;
	order: number;
};

export type CombinationEntry = {
	imageUuid: string | null;
	priceCents: number | null;
	leadTimeProfileId: string | null;
	disabled: boolean;
};

export type ListingFormState = {
	title: string;
	setTitle: (v: string) => void;
	titleError: string | null;
	setTitleError: (v: string | null) => void;

	subtitle: string;
	setSubtitle: (v: string) => void;
	subtitleError: string | null;
	setSubtitleError: (v: string | null) => void;

	categoryId: string | null;
	setCategoryId: (v: string | null) => void;
	categoryError: string | null;
	setCategoryError: (v: string | null) => void;

	imageEntries: ImageEntry[];
	addImageFiles: (files: File[]) => void;
	removeImage: (index: number) => void;
	reorderImageEntries: (entries: ImageEntry[]) => void;
	isUploadingImages: boolean;
	uploadedUuids: string[];
	imageError: string | null;
	setImageError: (v: string | null) => void;

	descrSections: ListingDescrSection[];
	descrSectionIds: string[];
	addDescrSection: (section: ListingDescrSection) => void;
	updateDescrSection: (index: number, section: ListingDescrSection) => void;
	removeDescrSection: (index: number) => void;
	reorderDescrSections: (fromIndex: number, toIndex: number) => void;

	variations: Record<string, Variation>;
	addVariation: (variation: Variation) => void;
	removeVariation: (id: string) => void;
	updateVariation: (id: string, variation: Variation) => void;
	reorderVariations: (fromId: string, toId: string) => void;

	combinations: Record<string, CombinationEntry>;
	setCombinationField: (key: string, patch: Partial<CombinationEntry>) => void;
};

type UseListingFormOptions = {
	shopShortId: string;
	initialTitle?: string;
	initialSubtitle?: string;
	initialCategoryId?: string | null;
};

export const useListingForm = ({
	shopShortId,
	initialTitle = '',
	initialSubtitle = '',
	initialCategoryId = null,
}: UseListingFormOptions): ListingFormState => {
	const apiClient = useApiClient();

	const [title, setTitle] = useState(initialTitle);
	const [titleError, setTitleError] = useState<string | null>(null);

	const [subtitle, setSubtitle] = useState(initialSubtitle);
	const [subtitleError, setSubtitleError] = useState<string | null>(null);

	const [categoryId, setCategoryId] = useState<string | null>(initialCategoryId);
	const [categoryError, setCategoryError] = useState<string | null>(null);

	const [imageError, setImageError] = useState<string | null>(null);

	const [variations, setVariations] = useState<Record<string, Variation>>(() => ({
		[crypto.randomUUID()]: {
			name: 'Color',
			pricesVary: false,
			leadTimesVary: false,
			order: 0,
			options: {
				[crypto.randomUUID()]: { name: 'Red', order: 0 },
				[crypto.randomUUID()]: { name: 'Forest Green', order: 1 },
				[crypto.randomUUID()]: { name: 'Midnight Blue', order: 2 },
			},
		},
		[crypto.randomUUID()]: {
			name: 'Size',
			pricesVary: true,
			leadTimesVary: false,
			order: 1,
			options: {
				[crypto.randomUUID()]: { name: 'Small', order: 0 },
				[crypto.randomUUID()]: { name: 'Medium', order: 1 },
				[crypto.randomUUID()]: { name: 'Large', order: 2 },
				[crypto.randomUUID()]: { name: 'Extra Large', order: 3 },
			},
		},
		[crypto.randomUUID()]: {
			name: 'Material',
			pricesVary: false,
			leadTimesVary: true,
			order: 2,
			options: {
				[crypto.randomUUID()]: { name: 'Cotton', order: 0 },
				[crypto.randomUUID()]: { name: 'Merino Wool', order: 1 },
			},
		},
	}));

	const addVariation = (variation: Variation) => {
		setVariations((prev) => ({ ...prev, [crypto.randomUUID()]: variation }));
	};

	const removeVariation = (id: string) => {
		setVariations((prev) => {
			const next = { ...prev };
			delete next[id];
			return next;
		});
	};

	const updateVariation = (id: string, variation: Variation) => {
		setVariations((prev) => ({ ...prev, [id]: variation }));
	};

	const [combinations, setCombinations] = useState<Record<string, CombinationEntry>>({});

	const setCombinationField = (key: string, patch: Partial<CombinationEntry>) => {
		setCombinations((prev) => ({
			...prev,
			[key]: { ...{ imageUuid: null, priceCents: null, leadTimeProfileId: null, disabled: false }, ...prev[key], ...patch },
		}));
	};

	const reorderVariations = (fromId: string, toId: string) => {
		setVariations((prev) => {
			const sorted = Object.entries(prev).sort((a, b) => a[1].order - b[1].order);
			const fromIndex = sorted.findIndex(([id]) => id === fromId);
			const toIndex = sorted.findIndex(([id]) => id === toId);
			const [item] = sorted.splice(fromIndex, 1);
			sorted.splice(toIndex, 0, item);
			return Object.fromEntries(sorted.map(([id, v], i) => [id, { ...v, order: i }]));
		});
	};

	const [descrSections, setDescrSections] = useState<ListingDescrSection[]>([]);
	const [descrSectionIds, setDescrSectionIds] = useState<string[]>([]);

	const addDescrSection = (section: ListingDescrSection) => {
		setDescrSections((prev) => [...prev, section]);
		setDescrSectionIds((prev) => [...prev, crypto.randomUUID()]);
	};

	const updateDescrSection = (index: number, section: ListingDescrSection) => {
		setDescrSections((prev) => prev.map((s, i) => (i === index ? section : s)));
	};

	const removeDescrSection = (index: number) => {
		setDescrSections((prev) => prev.filter((_, i) => i !== index));
		setDescrSectionIds((prev) => prev.filter((_, i) => i !== index));
	};

	const reorderDescrSections = (fromIndex: number, toIndex: number) => {
		const move = <T,>(arr: T[]): T[] => {
			const result = [...arr];
			const [item] = result.splice(fromIndex, 1);
			result.splice(toIndex, 0, item);
			return result;
		};
		setDescrSections(move);
		setDescrSectionIds(move);
	};

	const {
		imageEntries,
		addFiles,
		removeImage,
		reorderImages,
		isUploading,
		uuids,
	} = useImageUpload(async (contentType) => {
		const result = await callApi(
			apiClient.shops.getListingImageUploadUrl({
				params: { id: shopShortId },
				body: { contentType },
			}),
		);
		return result.error !== null ? null : result.data;
	});

	return {
		title,
		setTitle,
		titleError,
		setTitleError,
		subtitle,
		setSubtitle,
		subtitleError,
		setSubtitleError,
		categoryId,
		setCategoryId,
		categoryError,
		setCategoryError,
		imageEntries,
		addImageFiles: addFiles,
		removeImage,
		reorderImageEntries: reorderImages,
		isUploadingImages: isUploading,
		uploadedUuids: uuids,
		imageError,
		setImageError,
		descrSections,
		descrSectionIds,
		addDescrSection,
		updateDescrSection,
		removeDescrSection,
		reorderDescrSections,
		variations,
		addVariation,
		removeVariation,
		updateVariation,
		reorderVariations,
		combinations,
		setCombinationField,
	};
};
