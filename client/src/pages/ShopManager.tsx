import { Box, Heading, Tabs } from '@chakra-ui/react';
import React, { ComponentProps, JSX, JSXElementConstructor, ReactNode } from 'react';

export const ShopManager = () => {
	return (
		<Box mt={10} mx="auto" maxWidth={1200}>
			<Heading size="3xl">Shop Manager</Heading>
			<Tabs.Root orientation="vertical" defaultValue="profile" mt={10} size="lg">
				<Tabs.List>
					<Tabs.Trigger value="profile">Profile</Tabs.Trigger>
					<Tabs.Trigger value="listings">Listings</Tabs.Trigger>
					<Tabs.Trigger value="orders">Orders</Tabs.Trigger>
					<Tabs.Trigger value="messages">Messages</Tabs.Trigger>{' '}
				</Tabs.List>
				<Tabs.Indicator />
				<Tabs.Content value="profile">Profile</Tabs.Content>
				<Tabs.Content value="listings">Listings</Tabs.Content>
				<Tabs.Content value="orders">Orders</Tabs.Content>
				<Tabs.Content value="messages">Messages</Tabs.Content>
			</Tabs.Root>
		</Box>
	);
};
