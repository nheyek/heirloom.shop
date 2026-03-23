export type SearchResult = {
	id: string;
	label: string;
};

export type SearchResultCollection = {
	categoryResults: SearchResult[];
	shopResults: SearchResult[];
	listingResults: SearchResult[];
};
