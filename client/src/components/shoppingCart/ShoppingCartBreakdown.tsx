import { DataList } from '@chakra-ui/react';
import { JSX } from 'react';
import { useShoppingCart } from '../../providers/ShoppingCartProvider';

type Props = {
	pendingLineItemMessage: JSX.Element | string;
	textColor?: string;
};

export const ShoppingCartBreakdown = (props: Props) => {
	const shoppingCart = useShoppingCart();

	return (
		<DataList.Root
			orientation="horizontal"
			gap={2}
		>
			{[
				{
					label: 'Item Total',
					value: `$${shoppingCart.itemPriceTotal.toLocaleString()}.00`,
				},
				{
					label: 'Shipping',
					value: shoppingCart.shippingTotal
						? `$${shoppingCart.shippingTotal.toLocaleString()}.00`
						: 'Free',
				},
				{
					label: 'Tax',
					value: props.pendingLineItemMessage,
				},
			].map(({ label, value }) => (
				<DataList.Item
					key={label}
					fontSize={16}
					color={props.textColor}
				>
					<DataList.ItemLabel
						minWidth={75}
						fontWeight={500}
						color={props.textColor}
					>
						{label}
					</DataList.ItemLabel>
					<DataList.ItemValue>{value}</DataList.ItemValue>
				</DataList.Item>
			))}
		</DataList.Root>
	);
};
