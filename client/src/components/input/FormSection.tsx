import { Stack, Text } from '@chakra-ui/react';
import { TEXT_STYLES } from '@client/theme';
import { ReactNode } from 'react';

const LABEL_GAP = 1.5;

export const FormSection = ({
	label,
	children,
}: {
	label: ReactNode;
	children: ReactNode;
}) => (
	<Stack
		gap={LABEL_GAP}
		align="flex-start"
	>
		<Text textStyle={TEXT_STYLES.fieldLabel}>{label}</Text>
		{children}
	</Stack>
);
