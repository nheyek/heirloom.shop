import { Button, Menu, Portal, Text } from '@chakra-ui/react';
import { ShippingProvider } from '@heirloom/common/constants';
import { IoMdArrowDropdown } from 'react-icons/io';

type ShippingProviderSelectProps = {
	value: ShippingProvider;
	onChange: (value: ShippingProvider) => void;
};

const providers = Object.values(ShippingProvider);

const SHIPPING_PROVIDER_SELECT_WIDTH = 90;

export const ShippingProviderSelect = ({
	value,
	onChange,
}: ShippingProviderSelectProps) => (
	<Menu.Root
		onSelect={(details) =>
			onChange(details.value as ShippingProvider)
		}
		positioning={{ sameWidth: true }}
	>
		<Menu.Trigger asChild>
			<Button
				size="xl"
				variant="subtle"
				borderRadius="md"
				px={3}
				fontWeight={400}
				fontSize={18}
				width={SHIPPING_PROVIDER_SELECT_WIDTH}
				justifyContent="space-between"
			>
				<Text>{value}</Text>
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
							<Text>{provider}</Text>
						</Menu.Item>
					))}
				</Menu.Content>
			</Menu.Positioner>
		</Portal>
	</Menu.Root>
);
