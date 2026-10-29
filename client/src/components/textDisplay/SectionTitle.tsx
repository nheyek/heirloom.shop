import { Text } from '@chakra-ui/react';
import { displayFontFamily } from '@client/theme';
import { ReactNode } from 'react';

export const SectionTitle = (props: { children: ReactNode }) => (
	<Text
		fontSize={30}
		fontWeight={500}
		fontFamily={displayFontFamily}
	>
		{props.children}
	</Text>
);
