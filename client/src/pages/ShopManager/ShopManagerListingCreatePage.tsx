import { Button, Stack } from '@chakra-ui/react';
import { ListingFormFields } from '@client/components/listing/ListingFormFields';
import { useListingForm } from '@client/hooks/useListingForm';
import { FaPlusCircle } from 'react-icons/fa';

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
			<Button
				size="lg"
				width={175}
				fontSize={20}
				onClick={handleCreate}
			>
				<FaPlusCircle />
				Create
			</Button>
		</Stack>
	);
};
