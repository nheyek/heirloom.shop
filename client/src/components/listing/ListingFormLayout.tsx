import { Stack } from '@chakra-ui/react';
import { CombinationGrid } from '@client/components/listing/CombinationGrid';
import { ListingFormFields } from '@client/components/listing/ListingFormFields';
import { THUMBNAIL_GAP, THUMBNAIL_WIDTH } from '@client/constants';
import { ListingFormState } from '@client/hooks/useListingForm';
import { deriveCombinations } from '@client/utils/combinationUtils';
import { CHAKRA_SPACING_UNIT } from '@client/theme';

type Props = {
	form: ListingFormState;
	actions: React.ReactNode;
};

const FORM_MAX_W = 3 * THUMBNAIL_WIDTH + 2 * (CHAKRA_SPACING_UNIT * THUMBNAIL_GAP);

export const ListingFormLayout = ({ form, actions }: Props) => (
	<Stack gap={10}>
		<Stack gap={10} maxW={FORM_MAX_W}>
			<ListingFormFields form={form} />
			{actions}
		</Stack>
		{deriveCombinations(form.variations).length > 0 && (
			<CombinationGrid
				variations={form.variations}
				combinations={form.combinations}
				onUpdate={form.setCombinationField}
			/>
		)}
	</Stack>
);
