import { Button, HStack, Stack } from '@chakra-ui/react';
import { ListingFormFields } from '@client/components/listing/ListingFormFields';
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
		<Stack gap={5} maxW={650}>
			<ListingFormFields form={form} />
			<HStack>
				<Button
					size="lg"
					variant="outline"
					width={150}
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
					width={125}
					fontSize={20}
					onClick={handleCreate}
					disabled={isBlocked}
					loading={isBlocked}
				>
					<FaCheckCircle />
					Publish
				</Button>
			</HStack>
		</Stack>
	);
};
