import { useApiClient } from '@client/hooks/useApiClient';
import { useImageUpload, ImageEntry } from '@client/hooks/useImageUpload';
import { callApi } from '@client/utils/apiUtils';
import { ListingDescrSection } from '@heirloom/common/contract';
import { useState } from 'react';

export type { ImageEntry, ListingDescrSection };

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

	detailSections: ListingDescrSection[];
	detailSectionIds: string[];
	addDetailSection: (section: ListingDescrSection) => void;
	updateDetailSection: (index: number, section: ListingDescrSection) => void;
	removeDetailSection: (index: number) => void;
	reorderDetailSections: (fromIndex: number, toIndex: number) => void;
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

	const [detailSections, setDetailSections] = useState<ListingDescrSection[]>([]);
	const [detailSectionIds, setDetailSectionIds] = useState<string[]>([]);

	const addDetailSection = (section: ListingDescrSection) => {
		setDetailSections((prev) => [...prev, section]);
		setDetailSectionIds((prev) => [...prev, crypto.randomUUID()]);
	};

	const updateDetailSection = (index: number, section: ListingDescrSection) => {
		setDetailSections((prev) => prev.map((s, i) => (i === index ? section : s)));
	};

	const removeDetailSection = (index: number) => {
		setDetailSections((prev) => prev.filter((_, i) => i !== index));
		setDetailSectionIds((prev) => prev.filter((_, i) => i !== index));
	};

	const reorderDetailSections = (fromIndex: number, toIndex: number) => {
		const move = <T,>(arr: T[]): T[] => {
			const result = [...arr];
			const [item] = result.splice(fromIndex, 1);
			result.splice(toIndex, 0, item);
			return result;
		};
		setDetailSections(move);
		setDetailSectionIds(move);
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
		detailSections,
		detailSectionIds,
		addDetailSection,
		updateDetailSection,
		removeDetailSection,
		reorderDetailSections,
	};
};
