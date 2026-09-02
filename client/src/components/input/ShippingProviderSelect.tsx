import { Button, HStack, Menu, Portal, Text } from '@chakra-ui/react';
import { ShippingProviderIcon } from '@client/components/icons/ShippingProviderIcon';
import { ShippingProvider } from '@heirloom/common/constants';
import { IoMdArrowDropdown } from 'react-icons/io';

type ShippingProviderSelectProps = {
	value: ShippingProvider;
	onChange: (value: ShippingProvider) => void;
};

const providers = Object.values(ShippingProvider);

export const ShippingProviderSelect = ({
	value,
	onChange,
}: ShippingProviderSelectProps) => (
	<Menu.Root
		onSelect={(details) =>
			onChange(details.value as ShippingProvider)
		}
	>
		<Menu.Trigger asChild>
			<Button
				size="xl"
				variant="subtle"
				borderRadius="md"
				px={3}
				fontWeight={400}
				fontSize={18}
			>
				<HStack gap={1.5}>
					<ShippingProviderIcon provider={value} />
				</HStack>
				<IoMdArrowDropdown />
			</Button>
		</Menu.Trigger>
		<Portal>
			<Menu.Positioner>
				<Menu.Content
					maxH={300}
					overflowY="auto"
				>
					{providers.map((provider) => (
						<Menu.Item
							key={provider}
							value={provider}
							cursor="pointer"
							fontSize={18}
							p={2}
						>
							<HStack gap={3}>
								<ShippingProviderIcon
									provider={provider}
								/>
								<Text>{provider}</Text>
							</HStack>
						</Menu.Item>
					))}
				</Menu.Content>
			</Menu.Positioner>
		</Portal>
	</Menu.Root>
);
