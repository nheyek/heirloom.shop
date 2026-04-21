import { Center, Heading, Span, Stack } from '@chakra-ui/react';
import { OrderPage } from '@client/pages/OrderPage';
import { FONT_DECORATIVE } from '@client/theme';
import { useParams } from 'react-router-dom';

export const OrderIsolatedPage = () => {
	const { shortId } = useParams<{ shortId: string }>();

	return (
		<Center>
			<Stack
				w={{ base: '100%', md: 'fit-content' }}
				maxW={1000}
				py={{ base: 5, md: 8 }}
				px={5}
				gap={5}
			>
				<Heading
					fontSize={36}
					fontWeight={400}
					fontFamily={FONT_DECORATIVE}
				>
					Order <Span fontWeight={500}>{shortId}</Span>
				</Heading>
				<OrderPage />
			</Stack>
		</Center>
	);
};
