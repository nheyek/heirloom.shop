import { CLIENT_ROUTES } from '../constants';

export const useShareListing = () => {
	return (listing: {
		title: string;
		subtitle: string;
		shortId: string;
	}) => {
		const url = `${window.location.origin}/${CLIENT_ROUTES.listing}/${listing.shortId}`;
		if (navigator.share) {
			navigator
				.share({
					title: listing.title,
					text: listing.subtitle,
					url,
				})
				.catch(() => {});
		} else {
			navigator.clipboard.writeText(url);
		}
	};
};
