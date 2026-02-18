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
import { FaCreditCard } from 'react-icons/fa';
import { MdLocalShipping, MdShoppingCart } from 'react-icons/md';
import { ShoppingCartContents } from '../components/shoppingCart/ShoppingCartContents';
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

			<Stack gap={7}>
				<HStack
					gap={5}
					overflowX="scroll"
					m={-5}
					p={5}
				>
					<ShoppingCartContents
						truncated={layout === Layout.SINGLE_COLUMN}
					/>
				</HStack>

				<Stack gap={2}>
					<ShoppingCartSummary
						textColor="black"
						pendingLineItemMessage="Enter shipping address"
					/>

					<Heading
						size="3xl"
						fontWeight="medium"
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
					Shipping Address
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
							name="firstName"
						/>
					</Field.Root>
					<Field.Root>
						<FormInput
							placeholder="Last name"
							name="lastName"
						/>
					</Field.Root>
				</HStack>
				<Field.Root>
					<FormInput
						name="address"
						placeholder="Address"
					/>
				</Field.Root>
				<Field.Root>
					<FormInput
						name="addressSecondary"
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
							name="zip"
						/>
					</Field.Root>
				</HStack>
			</Fieldset.Root>
		</Stack>
	);

	const renderPaymentSection = () => (
		<HStack gap={2}>
			<FaCreditCard size={28} />
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
				gap={5}
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
