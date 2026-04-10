import { Box, Center, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useApiClient } from '@client/hooks/useApiClient';

export const OrderPage = () => {
	const { shortId } = useParams<{ shortId: string }>();
	const [searchParams] = useSearchParams();
	const key = searchParams.get('key') ?? '';
	const apiClient = useApiClient();

	const [status, setStatus] = useState<'loading' | 'authorized' | 'forbidden' | 'not_found'>('loading');

	useEffect(() => {
		if (!shortId) return;
		apiClient.orders.getByShortId({ params: { shortId }, query: { key } }).then((res) => {
			if (res.status === 200) setStatus('authorized');
			else if (res.status === 403) setStatus('forbidden');
			else setStatus('not_found');
		});
	}, [shortId, key]);

	return (
		<Box
			position="absolute"
			top={0}
			bottom={0}
			left={0}
			right={0}
		>
			<Center height="100%">
				{status === 'loading' && <Text>Loading...</Text>}
				{status === 'forbidden' && <Text>Access denied.</Text>}
				{status === 'not_found' && <Text>Order not found.</Text>}
				{status === 'authorized' && <Text>Order {shortId}</Text>}
			</Center>
		</Box>
	);
};
