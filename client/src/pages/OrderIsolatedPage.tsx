import { Heading, Span, Stack } from '@chakra-ui/react';
import { OrderPage } from '@client/pages/OrderPage';
import { displayFontFamily } from '@client/theme';
import { useParams } from 'react-router-dom';

export const OrderIsolatedPage = () => {
	const { shortId } = useParams<{ shortId: string }>();

	return (
		<Stack
			p={{ base: 5, md: 8 }}
			gap={5}
		>
			<Heading
				fontSize={36}
				fontWeight={400}
				fontFamily={displayFontFamily}
			>
				Order <Span fontWeight={500}>{shortId}</Span>
			</Heading>
			<OrderPage />
		</Stack>
	);
};
