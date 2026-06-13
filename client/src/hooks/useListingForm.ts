import { useState } from 'react';

export type ListingFormState = {
	title: string;
	setTitle: (v: string) => void;
	titleError: string | null;
	setTitleError: (v: string | null) => void;
};

type UseListingFormOptions = {
	initialTitle?: string;
};

export const useListingForm = ({
	initialTitle = '',
}: UseListingFormOptions = {}): ListingFormState => {
	const [title, setTitle] = useState(initialTitle);
	const [titleError, setTitleError] = useState<string | null>(null);

	return {
		title,
		setTitle,
		titleError,
		setTitleError,
	};
};
