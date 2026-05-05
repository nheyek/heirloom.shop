import {
	Field,
	Fieldset,
	HStack,
	Input,
	Textarea,
} from '@chakra-ui/react';
import { CountrySelect } from '@client/components/input/CountrySelect';
import { AppDrawer } from '@client/components/layout/AppDrawer';
import { CountryCode } from '@client/constants';
import { useState } from 'react';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const CreateShopDrawer = ({ isOpen, onClose }: Props) => {
	const [title, setTitle] = useState<string>('');
	const [subtitle, setSubtitle] = useState<string>('');
	const [country, setCountry] = useState<CountryCode>(
		CountryCode.US,
	);
	const [location, setLocation] = useState<string>('');

	return (
		<AppDrawer
			title="Create Shop"
			isOpen={isOpen}
			onClose={onClose}
		>
			<Fieldset.Root size="lg">
				<Field.Root>
					<Field.Label fontSize={18}>Title</Field.Label>
					<Input
						size="xl"
						fontSize={18}
						padding={3}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Field.Root>
				<Field.Root>
					<Field.Label fontSize={18}>Subtitle</Field.Label>
					<Textarea
						fontSize={18}
						padding={3}
						value={subtitle}
						onChange={(e) => setSubtitle(e.target.value)}
						resize="none"
					/>
				</Field.Root>
				<Field.Root>
					<Field.Label fontSize={18}>Location</Field.Label>
					<HStack width="100%">
						<CountrySelect
							value={country}
							onChange={setCountry}
						/>
						<Input
							size="xl"
							fontSize={18}
							padding={3}
							value={location}
							onChange={(e) =>
								setLocation(e.target.value)
							}
						/>
					</HStack>
				</Field.Root>
			</Fieldset.Root>
		</AppDrawer>
	);
};
