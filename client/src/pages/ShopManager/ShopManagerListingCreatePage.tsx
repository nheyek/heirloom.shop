import { Button, HStack } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listing/ListingFormLayout';
import { useListingForm } from '@client/hooks/useListingForm';
import { FaCheckCircle, FaSave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export const ShopManagerListingCreatePage = () => {
	const { shortId: shopShortId } = useParams<{ shortId: string }>();
	const form = useListingForm({ shopShortId: shopShortId! });

	const handleCreate = () => {
		// TODO: validate + call create API
	};

	const isBlocked = form.isUploadingImages;

	return (
		<ListingFormLayout
			form={form}
			actions={
				<HStack>
					<Button
						size="lg"
						variant="outline"
						fontSize={20}
						onClick={handleCreate}
						disabled={isBlocked}
						loading={isBlocked}
					>
						<FaSave />
						Save Draft
					</Button>
					<Button
						size="lg"
						fontSize={20}
						onClick={handleCreate}
						disabled={isBlocked}
						loading={isBlocked}
					>
						<FaCheckCircle />
						Publish
					</Button>
				</HStack>
			}
		/>
	);
};
