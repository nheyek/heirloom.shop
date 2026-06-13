import { Button, HStack, Stack } from '@chakra-ui/react';
import { ListingFormFields } from '@client/components/listing/ListingFormFields';
import { useListingForm } from '@client/hooks/useListingForm';
import { FaCheckCircle, FaSave } from 'react-icons/fa';

export const ShopManagerListingCreatePage = () => {
	const form = useListingForm();

	const handleCreate = () => {
		// TODO: validate + call create API
	};

	return (
		<Stack
			gap={5}
			maxW={650}
		>
			<ListingFormFields form={form} />
			<HStack>
				<Button
					size="lg"
					variant="outline"
					width={150}
					fontSize={20}
					onClick={handleCreate}
				>
					<FaSave />
					Save Draft
				</Button>
				<Button
					size="lg"
					width={125}
					fontSize={20}
					onClick={handleCreate}
				>
					<FaCheckCircle />
					Publish
				</Button>
			</HStack>
		</Stack>
	);
};
