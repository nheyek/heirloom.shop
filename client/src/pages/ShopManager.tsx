import {
	Box,
	Button,
	CloseButton,
	Dialog,
	Field,
	Fieldset,
	Heading,
	Input,
	Portal,
	Tabs,
	Textarea,
} from '@chakra-ui/react';
import { API_ROUTES } from '@common/constants';
import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import useApi from '../hooks/useApi';
import { useUserInfo } from '../Providers/UserProvider';

export const ShopManager = () => {
	const { getPublicResource, postResource } = useApi();
	const { user } = useUserInfo();

	const fetchListings = async () => {
		const { data, error } = await getPublicResource(API_ROUTES.listings);
		if (error) {
			console.error('Error fetching listings:', error);
		} else {
			console.log('Fetched listings:', data);
		}
	};

	const submitNewListing = async () => {
		const listingData = {
			title: 'test',
			desc: 'This is a test listing',
		};

		const { data, error } = await postResource(`shops/${user?.shopId}/listings`, listingData);
		if (error) {
			console.error('Error creating listing:', error);
		} else {
			console.log('Listing created:', data.id);
		}
	};

	useEffect(() => {}, []);

	return (
		<Box mt={10} mx="auto" maxWidth={1200}>
			<Box mx={10}>
				<Heading size="3xl">Shop Manager</Heading>
				<Tabs.Root orientation="vertical" defaultValue="profile" mt={10} size="lg">
					<Tabs.List>
						<Tabs.Trigger value="profile">Profile</Tabs.Trigger>
						<Tabs.Trigger value="listings">Listings</Tabs.Trigger>
						<Tabs.Trigger value="orders">Orders</Tabs.Trigger>
						<Tabs.Trigger value="messages">Messages</Tabs.Trigger>{' '}
					</Tabs.List>
					<Tabs.Indicator />
					<Tabs.Content value="profile">
						<Fieldset.Root size="lg" maxW="md" ml={5}>
							<Fieldset.Content>
								<Field.Root>
									<Field.Label>Shop Name</Field.Label>
									<Input name="name" />
								</Field.Root>
							</Fieldset.Content>

							<Button type="submit" alignSelf="flex-start">
								Save
							</Button>
						</Fieldset.Root>
					</Tabs.Content>
					<Tabs.Content value="listings">
						<Dialog.Root placement="center">
							<Dialog.Trigger asChild>
								<Button>
									<FaPlus />
									New Listing
								</Button>
							</Dialog.Trigger>
							<Portal>
								<Dialog.Backdrop />
								<Dialog.Positioner>
									<Dialog.Content>
										<Dialog.Header>
											<Dialog.Title>New Listing</Dialog.Title>
										</Dialog.Header>
										<Dialog.Body>
											<Fieldset.Root size="md">
												<Fieldset.Content>
													<Field.Root>
														<Field.Label>Product Title</Field.Label>
														<Input name="productTitle" />
													</Field.Root>
													<Field.Root>
														<Field.Label>
															Product Description
														</Field.Label>
														<Textarea name="productDesc" />
													</Field.Root>
												</Fieldset.Content>
											</Fieldset.Root>
										</Dialog.Body>
										<Dialog.Footer>
											<Dialog.ActionTrigger asChild>
												<Button variant="outline">Cancel</Button>
											</Dialog.ActionTrigger>
											<Button onClick={submitNewListing}>Save</Button>
										</Dialog.Footer>
										<Dialog.CloseTrigger asChild>
											<CloseButton size="sm" />
										</Dialog.CloseTrigger>
									</Dialog.Content>
								</Dialog.Positioner>
							</Portal>
						</Dialog.Root>
					</Tabs.Content>
					<Tabs.Content value="orders">Orders</Tabs.Content>
					<Tabs.Content value="messages">Messages</Tabs.Content>
				</Tabs.Root>
			</Box>
		</Box>
	);
};
