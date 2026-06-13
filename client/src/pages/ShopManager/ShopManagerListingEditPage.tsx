import { Button, Stack } from '@chakra-ui/react';
import { ListingFormFields } from '@client/components/listing/ListingFormFields';
import { useListingForm } from '@client/hooks/useListingForm';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export const ShopManagerListingEditPage = () => {
	const { listingShortId } = useParams<{ listingShortId: string }>();
	const form = useListingForm();

	const handleSave = () => {
		// TODO: validate + call update API
	};

	return (
		<Stack
			gap={5}
			maxW={650}
		>
			<ListingFormFields form={form} />
			<Button
				size="lg"
				width={175}
				fontSize={20}
				onClick={handleSave}
			>
				<FaCheckCircle />
				Save Changes
			</Button>
		</Stack>
	);
};
