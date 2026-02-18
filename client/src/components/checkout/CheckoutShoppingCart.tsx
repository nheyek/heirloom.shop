import { Button, HStack, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { TbSquaresFilled } from 'react-icons/tb';
import { ShoppingCartContents } from '../shoppingCart/ShoppingCartContents';

type Props = {
	truncated: boolean;
};

export const CheckoutShoppingCart = (props: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);

	if (props.truncated) {
		if (!isExpanded) {
			return (
				<Button
					size="xs"
					variant="outline"
					fontSize={18}
					gap={3}
					onClick={() => setIsExpanded(true)}
				>
					<TbSquaresFilled />
					show contents
				</Button>
			);
		}

		return (
			<Stack gap={5}>
				<HStack
					gap={5}
					overflowX="scroll"
					m={-5}
					p={5}
				>
					<ShoppingCartContents />
				</HStack>
				<Button
					size="xs"
					variant="outline"
					fontSize={18}
					gap={3}
					onClick={() => setIsExpanded(false)}
				>
					<FaChevronUp />
					hide contents
				</Button>
			</Stack>
		);
	}
	return <ShoppingCartContents />;
};
