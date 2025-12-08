import { GiGemNecklace } from 'react-icons/gi';
import { BsHandbagFill } from 'react-icons/bs';
import { CategoryIconCode } from '../../constants';
import { GiPorcelainVase } from 'react-icons/gi';
import { FaChair } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

export const CategoryIcon = (props: { iconCode: CategoryIconCode | null }) => {
	switch (props.iconCode) {
		case CategoryIconCode.GEM_NECKLACE:
			return <GiGemNecklace />;
		case CategoryIconCode.HANDBAG:
			return <BsHandbagFill />;
		case CategoryIconCode.VASE:
			return <GiPorcelainVase />;
		case CategoryIconCode.CHAIR:
			return <FaChair />;
		default:
			return <MdCategory />;
	}
};
