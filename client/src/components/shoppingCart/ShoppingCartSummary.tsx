import { DataList, Spinner } from '@chakra-ui/react';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { JSX } from 'react';

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
					color={props.textColor}
				>
					<DataList.ItemLabel
						minWidth={75}
						textStyle="fieldLabel"
						color={props.textColor}
					>
						{label}
					</DataList.ItemLabel>
					<DataList.ItemValue fontSize={20}>
						{value}
					</DataList.ItemValue>
				</DataList.Item>
			))}
		</DataList.Root>
	);
};
