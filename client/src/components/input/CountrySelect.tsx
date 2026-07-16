import { Button, HStack, Menu, Portal, Text } from '@chakra-ui/react';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { CountryCode, countryDisplayName } from '@client/constants';
import { IoMdArrowDropdown } from 'react-icons/io';

type CountrySelectProps = {
	value: CountryCode | null;
	onChange: (value: CountryCode) => void;
};

const sortedCountryCodes = Object.values(CountryCode).sort((a, b) =>
	countryDisplayName[a].localeCompare(countryDisplayName[b]),
);

export const CountrySelect = ({
	value,
	onChange,
}: CountrySelectProps) => (
	<Menu.Root
		onSelect={(details) => onChange(details.value as CountryCode)}
	>
		<Menu.Trigger asChild>
			<Button
				size="xl"
				variant="subtle"
				borderRadius="md"
				justifyContent="space-between"
				px={3}
				fontWeight={400}
				fontSize={18}
			>
				<HStack gap={1.5}>
					<CountryFlagIcon countryCode={value} />
				</HStack>
				<IoMdArrowDropdown />
			</Button>
		</Menu.Trigger>
		<Portal>
			<Menu.Positioner width="var(--trigger-width)">
				<Menu.Content
					maxH={300}
					overflowY="auto"
				>
					{sortedCountryCodes.map((code) => (
						<Menu.Item
							key={code}
							value={code}
							cursor="pointer"
							fontSize={18}
							p={2}
						>
							<HStack gap={3}>
								<CountryFlagIcon
									countryCode={code}
									size={20}
								/>
								<Text>
									{countryDisplayName[code]}
								</Text>
							</HStack>
						</Menu.Item>
					))}
				</Menu.Content>
			</Menu.Positioner>
		</Portal>
	</Menu.Root>
);
