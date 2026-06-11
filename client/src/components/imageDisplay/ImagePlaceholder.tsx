import { Box } from '@chakra-ui/react';

type Props = {
	aspectRatio?: number | number[];
};

const S = '60px';
const c1 = '#ffffff';
const c2 = '#000000';

const linkedSquaresBackground = [
	`calc(.9*${S}) calc(.9*${S}) / calc(2*${S}) calc(2*${S}) conic-gradient(at 20% 20%, #0000 75%, ${c2} 0)`,
	`calc(-.1*${S}) calc(-.1*${S}) / calc(2*${S}) calc(2*${S}) conic-gradient(at 20% 20%, #0000 75%, ${c2} 0)`,
	`calc(.7*${S}) calc(.7*${S}) / calc(2*${S}) calc(2*${S}) conic-gradient(at 40% 40%, #0000 75%, ${c1} 0)`,
	`calc(-.3*${S}) calc(-.3*${S}) / calc(2*${S}) calc(2*${S}) conic-gradient(at 40% 40%, #0000 75%, ${c1} 0)`,
	`0 0 / ${S} ${S} conic-gradient(from 90deg at 20% 20%, ${c2} 25%, ${c1} 0)`,
].join(', ');

export const ImagePlaceholder = ({ aspectRatio = 3 / 2 }: Props) => (
	<Box
		width="100%"
		aspectRatio={aspectRatio}
		style={{
			background: linkedSquaresBackground,
		}}
	/>
);
