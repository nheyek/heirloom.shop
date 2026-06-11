import { ListingCardData } from '@heirloom/common/contract';
import { FaPencil } from 'react-icons/fa6';
import { ListingCard } from './ListingCard';

type Props = ListingCardData & {
	multiImage?: boolean;
	onEdit: () => void;
};

export const ListingEditCard = ({ onEdit, ...props }: Props) => (
	<ListingCard
		{...props}
		iconMenu={[
			{
				icon: FaPencil,
				onClick: onEdit,
			},
		]}
	/>
);
