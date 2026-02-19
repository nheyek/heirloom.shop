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
import { MdLocalShipping, MdPayment } from 'react-icons/md';
import { CheckoutOrderSummary } from '../components/checkout/CheckoutOrderSummary';
import { ShoppingCartSummary } from '../components/shoppingCart/ShoppingCartSummary';
import { Layout } from '../constants';
import { useShoppingCart } from '../providers/ShoppingCartProvider';
import { FONT_DISPLAY_SANS } from '../theme';

export const CheckoutPage = () => {
	const shoppingCart = useShoppingCart();
	const layout = useBreakpointValue({
		base: Layout.SINGLE_COLUMN,
		md: Layout.MULTI_COLUMN,
	});

	const renderShoppingCartSection = () => (
		<Stack gap={4}>
			<CheckoutOrderSummary
				truncated={layout === Layout.SINGLE_COLUMN}
			/>
			<Stack
				gap={2}
				background="brand"
				py={5}
				px={10}
				mx={-10}
			>
				<ShoppingCartSummary
					textColor="white"
					pendingLineItemMessage="Enter shipping address"
				/>

				<Heading
					size="3xl"
					fontWeight="semibold"
					color="white"
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
		<Stack gap={3}>
			<HStack gap={3}>
				<MdLocalShipping size={30} />
				<Heading
					fontSize={24}
					fontWeight="medium"
					fontFamily={FONT_DISPLAY_SANS}
				>
					shipping
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
		<HStack gap={3}>
			<MdPayment size={30} />
			<Heading
				fontSize={24}
				fontWeight="medium"
				fontFamily={FONT_DISPLAY_SANS}
			>
				payment
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
				gap={4}
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
					{/* {layout === Layout.SINGLE_COLUMN &&
						renderPaymentSection()} */}
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
