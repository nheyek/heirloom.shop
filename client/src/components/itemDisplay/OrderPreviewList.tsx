import { HStack, Skeleton, Stack } from '@chakra-ui/react';
import { useOrderItemCardLayout } from '@client/hooks/useOrderItemCardLayout';
import { OrderResponse } from '@heirloom/common/contract';
import { OrderPreviewCard } from './OrderPreviewCard';

const ORDER_PREVIEW_LIST_MAX_WIDTH = 600;
const SKELETON_ITEM_COUNT = 3;
const COMPACT_SKELETON_HEIGHT = 380;
const STANDARD_SKELETON_HEIGHT = 110;

type Props = {
	orders: OrderResponse[];
	isLoading: boolean;
	linkTo?: (order: OrderResponse) => string;
};

export const OrderPreviewList = ({
	orders,
	isLoading,
	linkTo,
}: Props) => {
	const { layout, isCompact, cardProps } = useOrderItemCardLayout(
		isLoading ? SKELETON_ITEM_COUNT : orders.length,
	);

	const content = isLoading
		? Array.from({ length: SKELETON_ITEM_COUNT }).map((_, i) => (
				<Skeleton
					key={i}
					borderRadius="md"
					width={cardProps?.width}
					minW={cardProps?.minW}
					height={
						isCompact
							? COMPACT_SKELETON_HEIGHT
							: STANDARD_SKELETON_HEIGHT
					}
				/>
			))
		: orders.map((order) => (
				<OrderPreviewCard
					key={order.shortId}
					order={order}
					layout={layout}
					cardProps={cardProps}
					linkTo={linkTo?.(order)}
				/>
			));

	return isCompact ? (
		<HStack
			gap={5}
			m={-5}
			p={5}
			overflowX="scroll"
			alignItems="flex-start"
		>
			{content}
		</HStack>
	) : (
		<Stack
			width="100%"
			maxW={ORDER_PREVIEW_LIST_MAX_WIDTH}
			gap={5}
		>
			{content}
		</Stack>
	);
};
