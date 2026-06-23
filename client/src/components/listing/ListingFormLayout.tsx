import { Stack } from '@chakra-ui/react';
import { CombinationGrid } from '@client/components/listing/CombinationGrid';
import { ListingFormFields } from '@client/components/listing/ListingFormFields';
import { ListingFormState } from '@client/hooks/useListingForm';
import { deriveCombinations } from '@client/utils/combinationUtils';

type Props = {
	form: ListingFormState;
	actions: React.ReactNode;
};

export const ListingFormLayout = ({ form, actions }: Props) => (
	<Stack gap={5}>
		<ListingFormFields form={form} />
		{deriveCombinations(form.variations).length > 0 && (
			<CombinationGrid
				variations={form.variations}
				combinations={form.combinations}
				onUpdate={form.setCombinationField}
				processingProfiles={form.processingProfiles}
				onAddProcessingProfile={form.addProcessingProfile}
			/>
		)}
		<Stack mt={2.5}>{actions}</Stack>
	</Stack>
);
