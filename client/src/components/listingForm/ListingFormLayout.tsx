import { Stack } from '@chakra-ui/react';
import { CombinationGrid } from '@client/components/listingForm/CombinationGrid';
import { ListingFormFields } from '@client/components/listingForm/ListingFormFields';
import { ListingFormState } from '@client/hooks/useListingForm';
import { deriveCombinations } from '@client/utils/combinationUtils';
import { RefObject } from 'react';

type Props = {
	form: ListingFormState;
	actions: React.ReactNode;
	containerRef?: RefObject<HTMLDivElement | null>;
};

export const ListingFormLayout = ({ form, actions, containerRef }: Props) => (
	<Stack gap={5} ref={containerRef}>
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
