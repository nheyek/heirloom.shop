import {
	Field,
	Fieldset,
	HStack,
	Input,
	InputProps,
	Stack,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import { CheckoutHeading } from './CheckoutHeading';

export const CheckoutShippingForm = () => {
	return (
		<Stack gap={4}>
			<CheckoutHeading
				Icon={() => <MdLocalShipping size={30} />}
			>
				shipping
			</CheckoutHeading>
			<Fieldset.Root size="lg">
				<Field.Root>
					<FormInput
						placeholder="Email address"
						name="email"
						type="email"
					/>
				</Field.Root>

				<HStack gap={3}>
					<Field.Root>
						<FormInput
							placeholder="First name"
							name="given-name"
						/>
					</Field.Root>
					<Field.Root>
						<FormInput
							placeholder="Last name"
							name="family-name"
						/>
					</Field.Root>
				</HStack>
				<Field.Root>
					<FormInput
						name="address-line1"
						placeholder="Address"
					/>
				</Field.Root>
				<Field.Root>
					<FormInput
						name="address-line2"
						placeholder="Apartment, suite, etc. (optional)"
					/>
				</Field.Root>

				<HStack gap={3}>
					<Field.Root>
						<FormInput
							placeholder="City"
							name="city"
						/>
					</Field.Root>
					<Field.Root>
						<FormInput
							placeholder="State"
							name="state"
						/>
					</Field.Root>
					<Field.Root>
						<FormInput
							placeholder="Zip code"
							name="postal-code"
						/>
					</Field.Root>
				</HStack>
			</Fieldset.Root>
		</Stack>
	);
};

const FormInput = (props: InputProps) => (
	<Input
		height={11}
		variant="subtle"
		fontSize={15}
		{...props}
	/>
);
