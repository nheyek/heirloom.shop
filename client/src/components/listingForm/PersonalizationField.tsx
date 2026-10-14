import { FormField } from '@client/components/input/FormField';
import { PersonalizationProfileSelect } from '@client/components/listingForm/PersonalizationProfileSelect';
import { ListingFormState } from '@client/components/listingForm/useListingForm';

type Props = {
	form: ListingFormState;
	disabled?: boolean;
};

export const PersonalizationField = ({ form, disabled }: Props) => (
	<FormField label="Personalization">
		<PersonalizationProfileSelect
			shopShortId={form.shopShortId}
			profiles={form.personalizationProfiles}
			onAddProfile={form.addPersonalizationProfile}
			value={form.personalizationProfileId}
			onChange={form.setPersonalizationProfileId}
			disabled={disabled}
		/>
	</FormField>
);
