import { FormField } from '@client/components/input/FormField';
import { PriceInput } from '@client/components/input/PriceInput';
import { ListingFormState } from '@client/components/listingForm/useListingForm';
import { InputSize } from '@client/constants';

type Props = {
	form: ListingFormState;
	disabled?: boolean;
};

export const PriceField = ({ form, disabled }: Props) => {
	const pricesVary = Object.values(form.variations).some(
		(variation) => variation.pricesVary,
	);

	if (pricesVary) return null;

	return (
		<FormField
			label="Price"
			error={form.priceError}
			required
		>
			<PriceInput
				size={InputSize.Lg}
				value={form.priceCents}
				onChange={(v) => {
					form.setPriceCents(v);
					if (v && v > 0) form.setPriceError(null);
				}}
				invalid={!!form.priceError}
				disabled={disabled}
				enclosed
			/>
		</FormField>
	);
};
