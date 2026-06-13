import { Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const ShopManagerListingEditPage = () => {
	const { listingShortId } = useParams<{ listingShortId: string }>();

	return (
		<Stack gap={5}>
			<Text>Edit listing {listingShortId} — coming soon.</Text>
		</Stack>
	);
};
