import { CategoryIconCode } from '@client/constants';
import { IconType } from 'react-icons';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { BsHandbagFill } from 'react-icons/bs';
import { FaChair } from 'react-icons/fa';
import {
	GiCandleHolder,
	GiDropEarrings,
	GiPorcelainVase,
	GiRing,
} from 'react-icons/gi';

const iconMap: Record<CategoryIconCode, IconType> = {
	[CategoryIconCode.RING]: GiRing,
	[CategoryIconCode.EARRINGS]: GiDropEarrings,
	[CategoryIconCode.HANDBAG]: BsHandbagFill,
	[CategoryIconCode.VASE]: GiPorcelainVase,
	[CategoryIconCode.CHAIR]: FaChair,
	[CategoryIconCode.CANDLESTICK]: GiCandleHolder,
};

type Props = {
	iconCode: CategoryIconCode | null;
	size: number;
};

export const CategoryIcon = ({ iconCode, size }: Props) => {
	const Icon =
		(iconCode && iconMap[iconCode]) || BiSolidCategoryAlt;
	return <Icon size={size} />;
};
