import { useApiClient } from '@client/hooks/useApiClient';
import { useImageUpload, ImageEntry } from '@client/hooks/useImageUpload';
import { callApi } from '@client/utils/apiUtils';
import { useState } from 'react';

export type DetailSection = {
	id: string;
	title: string;
	richText: string;
};

export type { ImageEntry };

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
	isUploadingImages: boolean;
	uploadedUuids: string[];
	imageError: string | null;
	setImageError: (v: string | null) => void;

	detailSections: DetailSection[];
	addDetailSection: (section: Omit<DetailSection, 'id'>) => void;
	updateDetailSection: (id: string, section: Omit<DetailSection, 'id'>) => void;
	removeDetailSection: (id: string) => void;
	reorderDetailSections: (sections: DetailSection[]) => void;
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

	const [detailSections, setDetailSections] = useState<DetailSection[]>([]);

	const addDetailSection = (section: Omit<DetailSection, 'id'>) => {
		setDetailSections((prev) => [
			...prev,
			{ ...section, id: crypto.randomUUID() },
		]);
	};

	const updateDetailSection = (id: string, section: Omit<DetailSection, 'id'>) => {
		setDetailSections((prev) =>
			prev.map((s) => (s.id === id ? { ...section, id } : s)),
		);
	};

	const removeDetailSection = (id: string) => {
		setDetailSections((prev) => prev.filter((s) => s.id !== id));
	};

	const reorderDetailSections = (sections: DetailSection[]) => {
		setDetailSections(sections);
	};

	const {
		imageEntries,
		addFiles,
		removeImage,
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
		isUploadingImages: isUploading,
		uploadedUuids: uuids,
		imageError,
		setImageError,
		detailSections,
		addDetailSection,
		updateDetailSection,
		removeDetailSection,
		reorderDetailSections,
	};
};
