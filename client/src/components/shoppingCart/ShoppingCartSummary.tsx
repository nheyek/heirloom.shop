import { DataList, Spinner } from '@chakra-ui/react';
import { JSX } from 'react';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';

type Props = {
	pendingMessage: JSX.Element | string;
	textColor?: string;
};

export const ShoppingCartSummary = (props: Props) => {
	const shoppingCart = useShoppingCart();

	return (
		<DataList.Root
			orientation="horizontal"
			gap={2}
		>
			{[
				{
					label: 'Subtotal',
					value: formatCentsAsDollars(
						shoppingCart.itemPriceTotal,
					),
				},
				{
					label: 'Shipping',
					value: shoppingCart.shippingTotal
						? formatCentsAsDollars(
								shoppingCart.shippingTotal,
							)
						: '$0.00',
				},
				{
					label: 'Tax',
					value: (
						<>
							{shoppingCart.taxTotal === null && (
								<>
									{shoppingCart.taxCalcLoading ? (
										<Spinner size="sm" />
									) : (
										props.pendingMessage
									)}
								</>
							)}
							{shoppingCart.taxTotal !== null &&
								formatCentsAsDollars(
									shoppingCart.taxTotal,
								)}
						</>
					),
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
