import {
	Field,
	Fieldset,
	GridItem,
	Heading,
	HStack,
	Input,
	InputProps,
	SimpleGrid,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import {
	MdLocalShipping,
	MdPayment,
	MdShoppingCart,
} from 'react-icons/md';
import { CheckoutShoppingCart } from '../components/checkout/CheckoutShoppingCart';
import { ShoppingCartSummary } from '../components/shoppingCart/ShoppingCartSummary';
import { Layout } from '../constants';
import { useShoppingCart } from '../providers/ShoppingCartProvider';

export const CheckoutPage = () => {
	const shoppingCart = useShoppingCart();
	const layout = useBreakpointValue({
		base: Layout.SINGLE_COLUMN,
		md: Layout.MULTI_COLUMN,
	});

	const renderShoppingCartSection = () => (
		<Stack gap={4}>
			<HStack gap={2}>
				<MdShoppingCart size={28} />
				<Heading
					fontSize="2xl"
					fontWeight="medium"
				>
					Shopping Cart
				</Heading>
			</HStack>

			<CheckoutShoppingCart
				truncated={layout === Layout.SINGLE_COLUMN}
			/>

			<Stack gap={2}>
				<ShoppingCartSummary
					textColor="black"
					pendingLineItemMessage="Enter shipping address"
				/>

				<Heading
					size="3xl"
					fontWeight="semibold"
				>
					$
					{(
						shoppingCart.itemTotal +
						shoppingCart.shippingTotal
					).toLocaleString()}
					.00
				</Heading>
			</Stack>
		</Stack>
	);
	const renderFormSection = () => (
		<Stack gap={4}>
			<HStack gap={2}>
				<MdLocalShipping size={28} />
				<Heading
					size="2xl"
					fontWeight="medium"
				>
					Shipping Details
				</Heading>
			</HStack>
			<Fieldset.Root
				size="lg"
				maxW={600}
			>
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

	const renderPaymentSection = () => (
		<HStack gap={2}>
			<MdPayment size={28} />
			<Heading
				size="2xl"
				fontWeight="medium"
			>
				Payment
			</Heading>
		</HStack>
	);

	return (
		<Stack
			maxWidth={1100}
			mt={{ base: 5, md: 10 }}
			mx="auto"
		>
			<SimpleGrid
				columns={{ base: 1, md: 5, lg: 3 }}
				gap={8}
				mx={{ base: 5, md: 10 }}
			>
				<GridItem colSpan={{ base: 1, md: 3, lg: 2 }}>
					{layout === Layout.MULTI_COLUMN && (
						<Stack gap={8}>
							{renderFormSection()}
							{renderPaymentSection()}
						</Stack>
					)}
					{layout === Layout.SINGLE_COLUMN &&
						renderFormSection()}
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
					{renderShoppingCartSection()}
				</GridItem>
			</SimpleGrid>
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
