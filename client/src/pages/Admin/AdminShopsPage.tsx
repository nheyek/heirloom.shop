import { Button, Stack, Text } from '@chakra-ui/react';
import { CreateShopDrawer } from '@client/components/admin/CreateShopDrawer';
import { ItemGrid } from '@client/components/collections/ItemGrid';
import { AppError } from '@client/components/feedback/AppError';
import { ShopCard } from '@client/components/itemDisplay/ShopCard';
import { useApiClient } from '@client/hooks/useApiClient';
import { sidebarBreakpoint } from '@client/theme';
import { callApi } from '@client/utils/apiUtils';
import { ShopCardData } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

export const AdminShopsPage = () => {
	const [shops, setShops] = useState<ShopCardData[]>([]);
	const [shopsLoading, setShopsLoading] = useState<boolean>(false);
	const [shopsError, setShopsError] = useState<string | null>(null);
	const [createShopOpen, setCreateShopOpen] = useState(false);

	const apiClient = useApiClient();
	const loadShopData = async () => {
		const result = await callApi(apiClient.shops.getAll());
		if (result.error !== null) {
			setShopsError('Failed to load shops');
		} else {
			setShops(result.data);
		}
		setShopsLoading(false);
	};

	useEffect(() => {
		loadShopData();
	}, []);

	return (
		<>
			<Stack gap={5}>
				<Button
					size="lg"
					width={160}
					onClick={() => setCreateShopOpen(true)}
				>
					<FaPlusCircle />
					<Text fontSize={20}>Create Shop</Text>
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

			<CreateShopDrawer
				isOpen={createShopOpen}
				onClose={() => setCreateShopOpen(false)}
			/>
		</>
	);
};
