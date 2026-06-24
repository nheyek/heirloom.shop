import { Stack } from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
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
			<Stack gap={1.5}>
				<CombinationGrid
					variations={form.variations}
					combinations={form.combinations}
					onUpdate={(key, patch) => {
						form.setCombinationField(key, patch);
						if (patch.disabled) {
							if (form.combinationPriceErrors[key]) {
								const next = { ...form.combinationPriceErrors };
								delete next[key];
								form.setCombinationPriceErrors(next);
							}
							if (form.combinationProcessingErrors[key]) {
								const next = { ...form.combinationProcessingErrors };
								delete next[key];
								form.setCombinationProcessingErrors(next);
							}
						}
						if (patch.disabled === false && form.combinationActiveError) {
							form.setCombinationActiveError(null);
						}
						if (patch.priceCents && patch.priceCents > 0 && form.combinationPriceErrors[key]) {
							const next = { ...form.combinationPriceErrors };
							delete next[key];
							form.setCombinationPriceErrors(next);
						}
						if (patch.leadTimeProfileId && form.combinationProcessingErrors[key]) {
							const next = { ...form.combinationProcessingErrors };
							delete next[key];
							form.setCombinationProcessingErrors(next);
						}
					}}
					processingProfiles={form.processingProfiles}
					onAddProcessingProfile={form.addProcessingProfile}
					combinationPriceErrors={form.combinationPriceErrors}
					combinationProcessingErrors={form.combinationProcessingErrors}
					invalid={!!form.combinationActiveError}
				/>
				{form.combinationActiveError && (
					<FieldError>{form.combinationActiveError}</FieldError>
				)}
			</Stack>
		)}
		<Stack mt={2.5}>{actions}</Stack>
	</Stack>
);
