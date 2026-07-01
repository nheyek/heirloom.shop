import { Stack } from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import { CombinationGrid } from '@client/components/listingForm/CombinationGrid';
import { ListingFormFields } from '@client/components/listingForm/ListingFormFields';
import { ListingFormState } from '@client/hooks/useListingForm';
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
		gap={5}
		ref={containerRef}
	>
		<ListingFormFields form={form} disabled={disabled} />
		{deriveCombinationsList(form.variations).length > 0 && (
			<Stack gap={1.5}>
				<CombinationGrid
					variations={form.variations}
					combinations={form.combinations}
					uploadImage={form.uploadImage}
					shopShortId={form.shopShortId}
					disabled={disabled}
					onUpdate={(key, patch) => {
						form.setCombinationField(key, patch);
						if (patch.disabled) {
							if (form.combinationPriceErrors[key]) {
								const next = { ...form.combinationPriceErrors };
								delete next[key];
								form.setCombinationPriceErrors(next);
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
					}}
					combinationPriceErrors={form.combinationPriceErrors}
					invalid={!!form.combinationActiveError}
				/>
				{form.combinationActiveError && (
					<FieldError>
						{form.combinationActiveError}
					</FieldError>
				)}
			</Stack>
		)}
		<Stack mt={2.5}>{actions}</Stack>
	</Stack>
);
