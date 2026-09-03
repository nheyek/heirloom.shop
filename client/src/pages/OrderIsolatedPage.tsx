import {
	Heading,
	Span,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { OrderPage } from '@client/pages/OrderPage';
import { displayFontFamily } from '@client/theme';
import { useParams } from 'react-router-dom';

export const OrderIsolatedPage = () => {
	const { shortId } = useParams<{ shortId: string }>();

	const isDesktop = useBreakpointValue({ base: false, md: true });

	return (
		<Stack
			p={5}
			gap={5}
			width="fit-content"
			{...(isDesktop && { mx: 'auto', mt: 5, minWidth: 600 })}
		>
			<Heading
				fontSize={36}
				fontWeight={400}
				fontFamily={displayFontFamily}
			>
				Order #<Span fontWeight={500}>{shortId}</Span>
			</Heading>
			<OrderPage />
		</Stack>
	);
};
