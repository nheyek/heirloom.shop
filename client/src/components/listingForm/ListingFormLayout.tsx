import { Stack } from '@chakra-ui/react';
import { FORM_FIELD_GAP } from '@client/constants';
import { FieldError } from '@client/components/input/FieldError';
import { FormSection } from '@client/components/input/FormSection';
import { CombinationGrid } from '@client/components/listingForm/CombinationGrid';
import { ImagesField } from '@client/components/listingForm/ImagesField';
import { ListingFormFields } from '@client/components/listingForm/ListingFormFields';
import { PersonalizationField } from '@client/components/listingForm/PersonalizationField';
import { TrackInventoryField } from '@client/components/listingForm/TrackInventoryField';
import { ListingFormState } from '@client/components/listingForm/useListingForm';
import { deriveCombinationsList } from '@heirloom/common/domain/listing';
import { RefObject } from 'react';

type Props = {
	form: ListingFormState;
	actions: React.ReactNode;
	containerRef?: RefObject<HTMLDivElement | null>;
	disabled?: boolean;
};

export const ListingFormLayout = ({
	form,
	actions,
	containerRef,
	disabled,
}: Props) => (
	<Stack
		gap={FORM_FIELD_GAP}
		ref={containerRef}
	>
		<ListingFormFields form={form} disabled={disabled} />
		<ImagesField
			form={form}
			disabled={disabled}
		/>
		<TrackInventoryField
			form={form}
			disabled={disabled}
		/>
		<PersonalizationField
			form={form}
			disabled={disabled}
		/>
		{deriveCombinationsList(form.variations).length > 0 && (
			<FormSection label="Availability">
				<CombinationGrid
					variations={form.variations}
					combinations={form.combinations}
					trackInventory={form.trackInventory}
					disabled={disabled}
					onUpdate={(key, patch) => {
						form.setCombinationField(key, patch);
						// Any change that could resolve the error clears
						// it; validation on save re-checks everything.
						if (
							form.combinationError &&
							(patch.disabled !== undefined ||
								(patch.priceCents &&
									patch.priceCents > 0))
						) {
							form.setCombinationError(null);
							form.setInvalidCombinationKeys(
								new Set(),
							);
						}
					}}
					invalid={!!form.combinationError}
					invalidKeys={form.invalidCombinationKeys}
				/>
				{form.combinationError && (
					<FieldError>{form.combinationError}</FieldError>
				)}
			</FormSection>
		)}
		<Stack mt={2.5}>{actions}</Stack>
	</Stack>
);
