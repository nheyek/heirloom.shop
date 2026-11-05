import { Stack } from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import { ListingFormFieldLabel } from '@client/components/listingForm/ListingFormFieldLabel';
import { CombinationGrid } from '@client/components/listingForm/CombinationGrid';
import { ImagesField } from '@client/components/listingForm/ImagesField';
import { ListingFormFields } from '@client/components/listingForm/ListingFormFields';
import { PriceField } from '@client/components/listingForm/PriceField';
import { PersonalizationField } from '@client/components/listingForm/PersonalizationField';
import { TrackInventoryField } from '@client/components/listingForm/TrackInventoryField';
import { ListingFormState } from '@client/components/listingForm/useListingForm';
import {
	FORM_LABEL_GAP,
	LISTING_FORM_FIELD_GAP,
} from '@client/constants';
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
		gap={LISTING_FORM_FIELD_GAP}
		ref={containerRef}
	>
		<ListingFormFields
			form={form}
			disabled={disabled}
		/>
		<ImagesField
			form={form}
			disabled={disabled}
		/>

		<PersonalizationField
			form={form}
			disabled={disabled}
		/>
		<PriceField
			form={form}
			disabled={disabled}
		/>
		<TrackInventoryField
			form={form}
			disabled={disabled}
		/>
		{deriveCombinationsList(form.variations).length > 0 && (
			<Stack
				gap={FORM_LABEL_GAP}
				align="flex-start"
			>
				<ListingFormFieldLabel>
					Availability
				</ListingFormFieldLabel>
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
							form.setInvalidCombinationKeys(new Set());
						}
					}}
					invalid={!!form.combinationError}
					invalidKeys={form.invalidCombinationKeys}
				/>
				{form.combinationError && (
					<FieldError>{form.combinationError}</FieldError>
				)}
			</Stack>
		)}
		<Stack mt={2.5}>{actions}</Stack>
	</Stack>
);
