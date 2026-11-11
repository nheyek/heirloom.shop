import { Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const SectionTitle = (props: { children: ReactNode }) => (
	<Heading>{props.children}</Heading>
);
