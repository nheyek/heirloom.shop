import { ReturnPolicyType } from '@client/components/listingForm/ReturnProfileDialog';
import { ShippingCostType } from '@client/components/listingForm/ShippingProfileDialog';
import { useApiClient } from '@client/hooks/useApiClient';
import {
	ImageEntry,
	useImageUpload,
} from '@client/hooks/useImageUpload';
import { callApi } from '@client/utils/apiUtils';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import { ListingDescrSection } from '@heirloom/common/contract';
import {
	addVariationToCombinations,
	Combination,
	Combinations,
	DEFAULT_COMBINATION,
	deriveCombinationsList,
	removeVariationFromCombinations,
	syncVariationOptions,
	Variation,
	VariationOption,
	Variations,
} from '@heirloom/common/domain/listing';
import { useState } from 'react';

export type ProcessingProfile = {
	id: string;
	name: string;
	minDays: number;
	maxDays: number;
};

export type ReturnProfile = {
	id: string;
	name: string;
	windowDays?: number;
	policy:
		| { type: ReturnPolicyType.Standard; text: string }
		| { type: ReturnPolicyType.Custom; text: string }
		| { type: ReturnPolicyType.NoReturns };
};

export type ShippingProfile = {
	id: string;
	name: string;
	originZip: string;
	cost:
		| { type: ShippingCostType.Free }
		| { type: ShippingCostType.FlatRate; cents: number };
	minDays: number;
	maxDays: number;
};

export type {
	Combination,
	Combinations,
	ImageEntry,
	ListingDescrSection,
	Variation,
	VariationOption,
	Variations,
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

	priceCents: number | null;
	setPriceCents: (v: number | null) => void;
	priceError: string | null;
	setPriceError: (v: string | null) => void;
	upc: string;
	setUpc: (v: string) => void;
	upcError: string | null;
	setUpcError: (v: string | null) => void;
	combinationPriceErrors: Record<string, boolean>;
	setCombinationPriceErrors: (v: Record<string, boolean>) => void;
	combinationUpcErrors: Record<string, boolean>;
	setCombinationUpcErrors: (v: Record<string, boolean>) => void;
	combinationActiveError: string | null;
	setCombinationActiveError: (v: string | null) => void;

	processingProfiles: ProcessingProfile[];
	addProcessingProfile: (profile: ProcessingProfile) => void;
	processingProfileId: string | null;
	setProcessingProfileId: (v: string | null) => void;
	processingProfileError: string | null;
	setProcessingProfileError: (v: string | null) => void;

	shippingProfiles: ShippingProfile[];
	addShippingProfile: (profile: ShippingProfile) => void;
	shippingProfileId: string | null;
	setShippingProfileId: (v: string | null) => void;
	shippingProfileError: string | null;
	setShippingProfileError: (v: string | null) => void;

	returnProfiles: ReturnProfile[];
	addReturnProfile: (profile: ReturnProfile) => void;
	returnProfileId: string | null;
	setReturnProfileId: (v: string | null) => void;
	returnProfileError: string | null;
	setReturnProfileError: (v: string | null) => void;

	descrSections: ListingDescrSection[];
	descrSectionIds: string[];
	addDescrSection: (section: ListingDescrSection) => void;
	updateDescrSection: (
		index: number,
		section: ListingDescrSection,
	) => void;
	removeDescrSection: (index: number) => void;
	reorderDescrSections: (
		fromIndex: number,
		toIndex: number,
	) => void;

	variations: Record<string, Variation>;
	addVariation: (variation: Variation) => void;
	removeVariation: (id: string) => void;
	updateVariation: (
		id: string,
		variation: Variation,
	) => void;
	reorderVariations: (fromId: string, toId: string) => void;

	combinations: Combinations;
	setCombinationField: (
		key: string,
		patch: Partial<Combination>,
	) => void;

	validate: () => boolean;
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
	const [subtitleError, setSubtitleError] = useState<string | null>(
		null,
	);

	const [categoryId, setCategoryId] = useState<string | null>(
		initialCategoryId,
	);
	const [categoryError, setCategoryError] = useState<string | null>(
		null,
	);

	const [imageError, setImageError] = useState<string | null>(null);
	const [priceCents, setPriceCents] = useState<number | null>(null);
	const [priceError, setPriceError] = useState<string | null>(null);
	const [upc, setUpc] = useState('');
	const [upcError, setUpcError] = useState<string | null>(null);
	const [combinationPriceErrors, setCombinationPriceErrors] =
		useState<Record<string, boolean>>({});
	const [combinationUpcErrors, setCombinationUpcErrors] =
		useState<Record<string, boolean>>({});
	const [combinationActiveError, setCombinationActiveError] =
		useState<string | null>(null);
	const [processingProfiles, setProcessingProfiles] = useState<
		ProcessingProfile[]
	>([]);
	const addProcessingProfile = (profile: ProcessingProfile) =>
		setProcessingProfiles((prev) => [...prev, profile]);
	const [processingProfileId, setProcessingProfileId] = useState<
		string | null
	>(null);
	const [processingProfileError, setProcessingProfileError] =
		useState<string | null>(null);

	const [shippingProfiles, setShippingProfiles] = useState<
		ShippingProfile[]
	>([]);
	const addShippingProfile = (profile: ShippingProfile) =>
		setShippingProfiles((prev) => [...prev, profile]);
	const [shippingProfileId, setShippingProfileId] = useState<
		string | null
	>(null);
	const [shippingProfileError, setShippingProfileError] = useState<
		string | null
	>(null);

	const [returnProfiles, setReturnProfiles] = useState<
		ReturnProfile[]
	>([]);
	const addReturnProfile = (profile: ReturnProfile) =>
		setReturnProfiles((prev) => [...prev, profile]);
	const [returnProfileId, setReturnProfileId] = useState<
		string | null
	>(null);
	const [returnProfileError, setReturnProfileError] = useState<
		string | null
	>(null);

	const [variations, setVariations] = useState<Variations>(
		{},
	);

	const addVariation = (variation: Variation) => {
		const newId = crypto.randomUUID();
		const optionIds = Object.keys(variation.options);
		setVariations((prev) => ({ ...prev, [newId]: variation }));
		setCombinations((prev) =>
			addVariationToCombinations(prev, newId, optionIds),
		);
	};

	const removeVariation = (id: string) => {
		setVariations((prev) => {
			const next = { ...prev };
			delete next[id];
			return next;
		});
		setCombinations((prev) =>
			removeVariationFromCombinations(prev, id),
		);
	};

	const updateVariation = (
		id: string,
		variation: Variation,
	) => {
		setVariations((prev) => {
			const oldOptionIds = Object.keys(prev[id]?.options ?? {});
			const newOptionIds = Object.keys(variation.options);
			setCombinations((prev) =>
				syncVariationOptions(
					prev,
					id,
					oldOptionIds,
					newOptionIds,
				),
			);
			return { ...prev, [id]: variation };
		});
	};

	const [combinations, setCombinations] =
		useState<Combinations>({});

	const setCombinationField = (
		key: string,
		patch: Partial<Combination>,
	) => {
		setCombinations((prev) => ({
			...prev,
			[key]: { ...DEFAULT_COMBINATION, ...prev[key], ...patch },
		}));
	};

	const reorderVariations = (fromId: string, toId: string) => {
		setVariations((prev) => {
			const sorted = Object.entries(prev).sort(
				(a, b) => a[1].order - b[1].order,
			);
			const fromIndex = sorted.findIndex(
				([id]) => id === fromId,
			);
			const toIndex = sorted.findIndex(([id]) => id === toId);
			const [item] = sorted.splice(fromIndex, 1);
			sorted.splice(toIndex, 0, item);
			return Object.fromEntries(
				sorted.map(([id, v], i) => [id, { ...v, order: i }]),
			);
		});
	};

	const [descrSections, setDescrSections] = useState<
		ListingDescrSection[]
	>([]);
	const [descrSectionIds, setDescrSectionIds] = useState<string[]>(
		[],
	);

	const addDescrSection = (section: ListingDescrSection) => {
		setDescrSections((prev) => [...prev, section]);
		setDescrSectionIds((prev) => [...prev, crypto.randomUUID()]);
	};

	const updateDescrSection = (
		index: number,
		section: ListingDescrSection,
	) => {
		setDescrSections((prev) =>
			prev.map((s, i) => (i === index ? section : s)),
		);
	};

	const removeDescrSection = (index: number) => {
		setDescrSections((prev) =>
			prev.filter((_, i) => i !== index),
		);
		setDescrSectionIds((prev) =>
			prev.filter((_, i) => i !== index),
		);
	};

	const reorderDescrSections = (
		fromIndex: number,
		toIndex: number,
	) => {
		const move = <T>(arr: T[]): T[] => {
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

	const validate = (): boolean => {
		let valid = true;

		const trimmedTitle = title.trim();
		if (!trimmedTitle) {
			setTitleError('Title is required.');
			valid = false;
		} else if (
			trimmedTitle.length > LISTING_LIMITS.maxTitleLength
		) {
			setTitleError(
				`Title must be ${LISTING_LIMITS.maxTitleLength} characters or fewer.`,
			);
			valid = false;
		} else {
			setTitleError(null);
		}

		const trimmedSubtitle = subtitle.trim();
		if (
			trimmedSubtitle.length > LISTING_LIMITS.maxSubtitleLength
		) {
			setSubtitleError(
				`Subtitle must be ${LISTING_LIMITS.maxSubtitleLength} characters or fewer.`,
			);
			valid = false;
		} else {
			setSubtitleError(null);
		}

		if (!categoryId) {
			setCategoryError('Category is required.');
			valid = false;
		} else {
			setCategoryError(null);
		}

		if (!shippingProfileId) {
			setShippingProfileError('Profile is required.');
			valid = false;
		} else {
			setShippingProfileError(null);
		}

		if (!returnProfileId) {
			setReturnProfileError('Profile is required.');
			valid = false;
		} else {
			setReturnProfileError(null);
		}

		if (!processingProfileId) {
			setProcessingProfileError('Profile is required.');
			valid = false;
		} else {
			setProcessingProfileError(null);
		}

		const allCombinations = deriveCombinationsList(variations);
		const variationValues = Object.values(variations);
		const pricesVary = variationValues.some((v) => v.pricesVary);

		if (!pricesVary) {
			if (!priceCents || priceCents <= 0) {
				setPriceError('Price is required.');
				valid = false;
			} else {
				setPriceError(null);
			}
		}

		const hasCombinations = allCombinations.length > 0;

		if (!hasCombinations) {
			if (upc && !/^\d{12}$/.test(upc)) {
				setUpcError('UPC must be exactly 12 digits.');
				valid = false;
			} else {
				setUpcError(null);
			}
		} else {
			setUpcError(null);
		}

		const priceErrors: Record<string, boolean> = {};
		const upcErrors: Record<string, boolean> = {};
		let hasActive = allCombinations.length === 0;

		for (const { key } of allCombinations) {
			const entry = combinations[key];
			if (entry?.disabled) continue;
			hasActive = true;
			if (pricesVary && !(entry?.priceCents && entry.priceCents > 0)) {
				priceErrors[key] = true;
			}
			if (entry?.upc && !/^\d{12}$/.test(entry.upc)) {
				upcErrors[key] = true;
			}
		}

		setCombinationPriceErrors(pricesVary ? priceErrors : {});
		setCombinationUpcErrors(upcErrors);

		if (Object.keys(priceErrors).length > 0) valid = false;
		if (Object.keys(upcErrors).length > 0) valid = false;

		if (allCombinations.length > 0 && !hasActive) {
			setCombinationActiveError(
				'At least one combination must be active.',
			);
			valid = false;
		} else {
			setCombinationActiveError(null);
		}

		return valid;
	};

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
		priceCents,
		setPriceCents,
		priceError,
		setPriceError,
		upc,
		setUpc,
		upcError,
		setUpcError,
		combinationPriceErrors,
		setCombinationPriceErrors,
		combinationUpcErrors,
		setCombinationUpcErrors,
		combinationActiveError,
		setCombinationActiveError,
		processingProfiles,
		addProcessingProfile,
		processingProfileId,
		setProcessingProfileId,
		processingProfileError,
		setProcessingProfileError,
		shippingProfiles,
		addShippingProfile,
		shippingProfileId,
		setShippingProfileId,
		shippingProfileError,
		setShippingProfileError,
		returnProfiles,
		addReturnProfile,
		returnProfileId,
		setReturnProfileId,
		returnProfileError,
		setReturnProfileError,
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
		validate,
	};
};
