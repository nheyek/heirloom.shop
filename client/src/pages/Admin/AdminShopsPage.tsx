import { Button, Link, Stack, Table, Text } from '@chakra-ui/react';
import { CreateShopDrawer } from '@client/components/admin/CreateShopDrawer';
import { AppError } from '@client/components/feedback/AppError';
import { useApiClient } from '@client/hooks/useApiClient';
import { callApi } from '@client/utils/apiUtils';
import { AdminShopListItem } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

export const AdminShopsPage = () => {
	const [shops, setShops] = useState<AdminShopListItem[]>([]);
	const [shopsError, setShopsError] = useState<string | null>(null);
	const [createShopOpen, setCreateShopOpen] = useState(false);

	const apiClient = useApiClient();

	useEffect(() => {
		callApi(apiClient.admin.getShops()).then((result) => {
			if (result.error !== null) {
				setShopsError('Failed to load shops');
			} else {
				setShops(result.data);
			}
		});
	}, []);

	return (
		<>
			<Stack gap={3}>
				<Button
					size="md"
					onClick={() => setCreateShopOpen(true)}
					width={140}
				>
					<FaPlusCircle />
					<Text fontSize={18}>Create Shop</Text>
				</Button>
				{shopsError ? (
					<AppError title="Failed to load shops" />
				) : (
					<Table.ScrollArea
						borderRadius="md"
						border="1px solid"
						borderColor="gray.200"
						maxW={1000}
					>
						<Table.Root
							size="lg"
							stickyHeader
							variant="outline"
							interactive
						>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>
										Title
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										Created
									</Table.ColumnHeader>

									<Table.ColumnHeader>
										Fulfillment
									</Table.ColumnHeader>
									<Table.ColumnHeader
										textAlign="right"
										width={50}
									>
										Listings
									</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{shops.map((shop) => (
									<Table.Row key={shop.id}>
										<Table.Cell>
											<Link>{shop.title}</Link>
										</Table.Cell>
										<Table.Cell>
											{shop.createdAt
												? new Date(
														shop.createdAt,
													).toLocaleDateString()
												: '—'}
										</Table.Cell>
										<Table.Cell>
											{shop.directFulfillment
												? 'Direct'
												: 'Heirloom'}
										</Table.Cell>
										<Table.Cell textAlign="right">
											{shop.listingCount}
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Table.ScrollArea>
				)}
			</Stack>

			<CreateShopDrawer
				isOpen={createShopOpen}
				onClose={() => setCreateShopOpen(false)}
				onSuccess={(newShop) => {
					setShops((prev) => [newShop, ...prev]);
					setCreateShopOpen(false);
				}}
			/>
		</>
	);
};
