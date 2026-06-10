import { Box } from '@chakra-ui/react';

type Props = {
	aspectRatio?: number | number[];
};

const line = `rgba(0,0,0, 0.25)`;

export const ImagePlaceholder = ({ aspectRatio = 3 / 2 }: Props) => (
	<Box
		width="100%"
		aspectRatio={aspectRatio}
		style={{
			backgroundColor: `#FFF`,
			backgroundImage: [
				`repeating-linear-gradient(45deg, ${line} 0, ${line} 5px, transparent 0, transparent 50%)`,
				`repeating-linear-gradient(-45deg, ${line} 0, ${line} 5px, transparent 0, transparent 50%)`,
			].join(', '),
			backgroundSize: '25px 25px',
		}}
	/>
);
