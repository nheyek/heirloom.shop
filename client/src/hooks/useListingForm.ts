import { useState } from 'react';

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
};

type UseListingFormOptions = {
	initialTitle?: string;
	initialSubtitle?: string;
	initialCategoryId?: string | null;
};

export const useListingForm = ({
	initialTitle = '',
	initialSubtitle = '',
	initialCategoryId = null,
}: UseListingFormOptions = {}): ListingFormState => {
	const [title, setTitle] = useState(initialTitle);
	const [titleError, setTitleError] = useState<string | null>(null);

	const [subtitle, setSubtitle] = useState(initialSubtitle);
	const [subtitleError, setSubtitleError] = useState<string | null>(null);

	const [categoryId, setCategoryId] = useState<string | null>(initialCategoryId);
	const [categoryError, setCategoryError] = useState<string | null>(null);

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
	};
};
