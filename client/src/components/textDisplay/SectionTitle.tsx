import { Text } from '@chakra-ui/react';
import { DISPLAY_FONT_FAMILY } from '@client/theme';
import { ReactNode } from 'react';

export const SectionTitle = (props: { children: ReactNode }) => (
	<Text
		fontSize={32}
		fontWeight={500}
		fontFamily={DISPLAY_FONT_FAMILY}
	>
		{props.children}
	</Text>
);
