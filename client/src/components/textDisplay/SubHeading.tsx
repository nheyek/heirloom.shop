import { Span, SpanProps } from '@chakra-ui/react';
import { DEFAULT_FONT_FAMILY } from '@client/theme';

const SUB_HEADING_FONT_SIZES = {
	sm: 18,
	md: 20,
	lg: 22,
	xl: 24,
};

type Props = Omit<SpanProps, 'size'> & {
	size?: keyof typeof SUB_HEADING_FONT_SIZES;
};

export const SubHeading = ({ size = 'xl', ...props }: Props) => (
	<Span
		fontFamily={DEFAULT_FONT_FAMILY}
		fontWeight={500}
		fontSize={SUB_HEADING_FONT_SIZES[size]}
		{...props}
	/>
);
