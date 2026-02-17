import {
	Field,
	Fieldset,
	GridItem,
	Heading,
	HStack,
	Input,
	SimpleGrid,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { MdLocalShipping, MdShoppingCart } from 'react-icons/md';
import { ShoppingCartContents } from '../components/shoppingCart/ShoppingCartContents';
import { Layout } from '../constants';

export const CheckoutPage = () => {
	const layout = useBreakpointValue({
		base: Layout.SINGLE_COLUMN,
		md: Layout.MULTI_COLUMN,
	});
	const renderShoppingCartSection = () => (
		<Stack gap={5}>
			<HStack gap={3}>
				<MdShoppingCart size={36} />
				<Heading size="3xl">Shopping Cart</Heading>
			</HStack>

			<Stack gap={5}>
				<ShoppingCartContents />
			</Stack>
		</Stack>
	);
	const renderFormSection = () => (
		<Stack gap={5}>
			<HStack gap={3}>
				<MdLocalShipping size={36} />
				<Heading size="3xl">Shipping Address</Heading>
			</HStack>
			<Fieldset.Root
				size="lg"
				maxW={600}
			>
				<Field.Root>
					<Input
						placeholder="Email address"
						name="email"
						type="email"
					/>
				</Field.Root>

				<HStack gap={5}>
					<Field.Root>
						<Input
							placeholder="First name"
							name="firstName"
						/>
					</Field.Root>
					<Field.Root>
						<Input
							placeholder="Last name"
							name="lastName"
						/>
					</Field.Root>
				</HStack>
				<Field.Root>
					<Input
						name="address"
						placeholder="Address"
					/>
				</Field.Root>
				<Field.Root>
					<Input
						name="addressSecondary"
						placeholder="Apartment, suite, etc. (optional)"
					/>
				</Field.Root>
			</Fieldset.Root>
		</Stack>
	);

	return (
		<Stack
			maxWidth={1100}
			mt={10}
			mx="auto"
		>
			<SimpleGrid
				columns={{ base: 1, md: 5, lg: 3 }}
				gap={5}
				mx={10}
			>
				<GridItem colSpan={{ base: 1, md: 3, lg: 2 }}>
					{renderFormSection()}
				</GridItem>
				<GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
					{renderShoppingCartSection()}
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};
