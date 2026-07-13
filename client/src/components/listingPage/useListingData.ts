import { useApiClient } from '@client/hooks/useApiClient';
import { callApi } from '@client/utils/apiUtils';
import { ListingPageData } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';

export const useListingData = (id: string | undefined) => {
	const apiClient = useApiClient();

	const [listingData, setListingData] =
		useState<ListingPageData | null>(null);
	const [listingDataLoading, setListingDataLoading] =
		useState<boolean>(true);
	const [listingDataError, setListingDataError] = useState<
		string | null
	>(null);

	const loadListingData = async () => {
		if (!id) return;

		const result = await callApi(
			apiClient.listings.getById({ params: { id } }),
		);
		if (result.error !== null) {
			setListingDataError(result.error);
		} else {
			setListingData(result.data);
		}
		setListingDataLoading(false);
	};

	useEffect(() => {
		setListingDataLoading(true);
		setListingDataError(null);

		loadListingData();
	}, [id]);

	return { listingData, listingDataLoading, listingDataError };
};
