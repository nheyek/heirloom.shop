import { Button, Stack, Text } from '@chakra-ui/react';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import { AppError } from '@client/components/feedback/AppError';
import { ShopCard } from '@client/components/itemDisplay/ShopCard';
import { useApiClient } from '@client/hooks/useApiClient';
import { sidebarBreakpoint } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { ShopCardData } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

export const AdminPage = () => {
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [shopsLoading, setShopsLoading] = useState<boolean>(false);
	const [shopsError, setShopsError] = useState<string | null>(null);

	const apiClient = useApiClient();
	const loadShopData = async () => {
		const result = await callApi(apiClient.shops.getAll());
		if (result.error !== null) {
			setShopsError('Failed to load makers');
		} else {
			setShops(result.data);
		}
		setShopsLoading(false);
	};

	useEffect(() => {
		loadShopData();
	}, []);

	return (
		<Stack gap={5}>
			<Button
				size="lg"
				width={175}
			>
				<FaPlusCircle />
				<Text fontSize={22}>Create Shop</Text>
			</Button>
			{shopsError ? (
				<AppError title="Failed to load makers" />
			) : (
				<ItemGrid
					items={shops}
					isLoading={shopsLoading}
					getItemKey={(shop) => shop.id}
					renderItem={(shop) => <ShopCard {...shop} />}
					columns={{
						base: 1,
						[sidebarBreakpoint.sm]: 2,
						[sidebarBreakpoint.md]: 3,
						[sidebarBreakpoint.lg]: 3,
					}}
				/>
			)}
		</Stack>
	);
};
