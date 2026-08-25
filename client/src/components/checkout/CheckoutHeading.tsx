import { HStack, Span } from '@chakra-ui/react';
import { displayFontFamily } from '@client/theme';
import { IconType } from 'react-icons';

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
			fontFamily={displayFontFamily}
		>
			{props.children}
		</Span>
	</HStack>
);
