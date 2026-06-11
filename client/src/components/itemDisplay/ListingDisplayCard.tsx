import { useShareListing } from '@client/hooks/useShareListing';
import { useFavorites } from '@client/providers/FavoritesProvider';
import { ListingCardData } from '@heirloom/common/contract';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { ListingCard } from './ListingCard';

type Props = ListingCardData & {
	multiImage?: boolean;
};

export const ListingDisplayCard = (props: Props) => {
	const shareListing = useShareListing();
	const { favoriteIds, toggleFavorite } = useFavorites();

	const isSaved = favoriteIds.has(props.shortId);

	return (
		<ListingCard
			{...props}
			iconMenu={[
				{
					icon: FaRegShareFromSquare,
					onClick: () => shareListing(props),
				},
				{
					icon: isSaved ? FaHeart : FaRegHeart,
					onClick: () => toggleFavorite(props),
					color: isSaved ? 'red.600' : undefined,
				},
			]}
		/>
	);
};
