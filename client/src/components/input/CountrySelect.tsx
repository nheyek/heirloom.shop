import {
	createListCollection,
	HStack,
	Portal,
	Select,
	Text,
} from '@chakra-ui/react';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { COUNTRY_DISPLAY_NAME, CountryCode } from '@client/constants';

type CountrySelectProps = {
	value: CountryCode | null;
	onChange: (value: CountryCode) => void;
	showName?: boolean;
};

const countryCollection = createListCollection({
	items: Object.values(CountryCode)
		.map((code) => ({
			value: code,
			label: COUNTRY_DISPLAY_NAME[code],
		}))
		.sort((a, b) => a.label.localeCompare(b.label)),
});

export const CountrySelect = ({
	value,
	onChange,
	showName,
}: CountrySelectProps) => (
	<Select.Root
		size="md"
		collection={countryCollection}
		value={value ? [value] : []}
		onValueChange={(e) => onChange(e.value[0] as CountryCode)}
		positioning={{ sameWidth: !!showName }}
		width="fit-content"
		minW={showName ? 225 : 20}
	>
		<Select.HiddenSelect />
		<Select.Control>
			<Select.Trigger>
				<HStack
					gap={3}
					flex={1}
				>
					<CountryFlagIcon
						size={20}
						countryCode={value}
					/>
					{showName && value && (
						<Text>{COUNTRY_DISPLAY_NAME[value]}</Text>
					)}
				</HStack>
				<Select.IndicatorGroup>
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Trigger>
		</Select.Control>
		<Portal>
			<Select.Positioner>
				<Select.Content maxH={300}>
					{countryCollection.items.map((item) => (
						<Select.Item
							key={item.value}
							item={item}
						>
							<HStack gap={3}>
								<CountryFlagIcon
									countryCode={item.value}
								/>
								<Text>{item.label}</Text>
							</HStack>
							<Select.ItemIndicator />
						</Select.Item>
					))}
				</Select.Content>
			</Select.Positioner>
		</Portal>
	</Select.Root>
);
