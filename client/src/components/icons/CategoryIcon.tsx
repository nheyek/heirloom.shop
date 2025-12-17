import { BsHandbagFill } from 'react-icons/bs';
import { CategoryIconCode } from '../../constants';
import { GiPorcelainVase } from 'react-icons/gi';
import { FaChair } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { TbToolsKitchen3 } from 'react-icons/tb';
import { GiPearlNecklace } from 'react-icons/gi';

type Props = {
	iconCode: CategoryIconCode | null;
	size: number;
};

export const CategoryIcon = (props: Props) => {
	switch (props.iconCode) {
		case CategoryIconCode.NECKLACE:
			return <GiPearlNecklace size={props.size} />;
		case CategoryIconCode.HANDBAG:
			return <BsHandbagFill size={props.size} />;
		case CategoryIconCode.VASE:
			return <GiPorcelainVase size={props.size} />;
		case CategoryIconCode.CHAIR:
			return <FaChair size={props.size} />;
		case CategoryIconCode.SILVERWARE:
			return <TbToolsKitchen3 size={props.size} />;
		default:
			return <MdCategory size={props.size} />;
	}
};
