import {
	CheckboxCard,
	Flex,
	HStack,
	Icon,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FieldError } from '@client/components/input/FieldError';
import { FIELD_ERROR_COLOR } from '@client/theme';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { FaSignature } from 'react-icons/fa';

type PersonalizationProfile = {
	name: string;
	costCents: number;
	helperText: string | null;
};

type Props = {
	profile: PersonalizationProfile;
	enabled: boolean;
	text: string;
	textError: string | null;
	onToggle: (checked: boolean) => void;
	onTextChange: (value: string) => void;
};

export const PersonalizationOption = ({
	profile,
	enabled,
	text,
	textError,
	onToggle,
	onTextChange,
}: Props) => (
	<CheckboxCard.Root
		checked={enabled}
		onCheckedChange={(e) => onToggle(!!e.checked)}
		size="md"
	>
		<CheckboxCard.HiddenInput />
		<CheckboxCard.Control>
			<Stack
				width="100%"
				gap={3}
			>
				<HStack justifyContent="space-between">
					<HStack gap={1}>
						<Flex px={1}>
							<Icon
								h={5}
								w={5}
								as={FaSignature}
							/>
						</Flex>

						<CheckboxCard.Label
							fontWeight={500}
							fontSize={16}
						>
							{profile.name}{' '}
						</CheckboxCard.Label>
					</HStack>

					<HStack gap={3}>
						<Text fontSize={18}>
							{formatCentsAsDollars(profile.costCents)}
						</Text>
						<CheckboxCard.Indicator />
					</HStack>
				</HStack>

				{enabled && (
					<Stack
						gap={2}
						onPointerDownCapture={(e) =>
							e.stopPropagation()
						}
					>
						<Input
							variant="outline"
							size="lg"
							width="100%"
							fontSize={18}
							value={text}
							onChange={(e) =>
								onTextChange(e.target.value)
							}
							placeholder={profile.name}
							borderColor={
								textError
									? FIELD_ERROR_COLOR
									: undefined
							}
						/>
						{textError && (
							<FieldError>{textError}</FieldError>
						)}
						{profile.helperText && (
							<Text
								fontSize={16}
								color="fg.muted"
							>
								{profile.helperText}
							</Text>
						)}
					</Stack>
				)}
			</Stack>
		</CheckboxCard.Control>
	</CheckboxCard.Root>
);
