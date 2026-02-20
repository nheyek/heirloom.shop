import { HStack, Span } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FONT_DISPLAY_SANS } from '../../theme';

type Props = {
	Icon: IconType;
	children: string;
};

export const CheckoutHeading = (props: Props) => (
	<HStack
		gap={3}
		h={8}
	>
		<props.Icon />
		<Span
			fontSize={24}
			fontWeight={500}
			fontFamily={FONT_DISPLAY_SANS}
		>
			{props.children}
		</Span>
	</HStack>
);
