import { Button, Stack } from '@chakra-ui/react';
import { ListingFormFields } from '@client/components/listing/ListingFormFields';
import { useListingForm } from '@client/hooks/useListingForm';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export const ShopManagerListingEditPage = () => {
	const { shortId: shopShortId, listingShortId } = useParams<{
		shortId: string;
		listingShortId: string;
	}>();
	const form = useListingForm({ shopShortId: shopShortId! });

	const handleSave = () => {
		// TODO: validate + call update API
	};

	const isBlocked = form.isUploadingImages;

	return (
		<Stack
			gap={10}
			maxW={650}
		>
			<ListingFormFields form={form} />
			<Button
				size="lg"
				width={175}
				fontSize={20}
				onClick={handleSave}
				disabled={isBlocked}
				loading={isBlocked}
			>
				<FaCheckCircle />
				Save Changes
			</Button>
		</Stack>
	);
};
