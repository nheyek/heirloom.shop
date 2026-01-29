import { CLIENT_ROUTES } from '../constants';

export const useShareListing = () => {
	return (listing: { title: string; subtitle: string; id: number }) => {
		const url = `${window.location.origin}/${CLIENT_ROUTES.listing}/${listing.id}`;
		if (navigator.share) {
			navigator.share({
				title: listing.title,
				text: listing.subtitle,
				url,
			}).catch(() => {});
		} else {
			navigator.clipboard.writeText(url);
		}
	};
};
