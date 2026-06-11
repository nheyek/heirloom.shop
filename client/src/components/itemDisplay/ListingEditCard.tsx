import { ListingCardData } from '@heirloom/common/contract';
import { MdEdit } from 'react-icons/md';
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
				icon: MdEdit,
				onClick: onEdit,
			},
		]}
	/>
);
