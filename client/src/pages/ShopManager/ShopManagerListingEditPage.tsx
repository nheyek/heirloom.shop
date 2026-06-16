import { Button } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listing/ListingFormLayout';
import { useListingForm } from '@client/hooks/useListingForm';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export const ShopManagerListingEditPage = () => {
	const { shortId: shopShortId } = useParams<{
		shortId: string;
		listingShortId: string;
	}>();
	const form = useListingForm({ shopShortId: shopShortId! });

	const handleSave = () => {
		// TODO: validate + call update API
	};

	const isBlocked = form.isUploadingImages;

	return (
		<ListingFormLayout
			form={form}
			actions={
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
			}
		/>
	);
};
