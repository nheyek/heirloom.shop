import { Stack } from '@chakra-ui/react';
import { ListingFormFields } from '@client/components/listing/ListingFormFields';
import { THUMBNAIL_GAP, THUMBNAIL_WIDTH } from '@client/constants';
import { ListingFormState } from '@client/hooks/useListingForm';
import { CHAKRA_SPACING_UNIT } from '@client/theme';

type Props = {
	form: ListingFormState;
	actions: React.ReactNode;
};

export const ListingFormLayout = ({ form, actions }: Props) => (
	<Stack
		gap={10}
		maxW={3 * THUMBNAIL_WIDTH + 2 * (CHAKRA_SPACING_UNIT * THUMBNAIL_GAP)}
	>
		<ListingFormFields form={form} />
		{actions}
	</Stack>
);
