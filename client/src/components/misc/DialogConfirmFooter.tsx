import { Button, HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type DialogConfirmFooterProps = {
	onCancel: () => void;
	onConfirm: () => void;
	confirmLabel: ReactNode;
	confirmIcon?: ReactNode;
	cancelLabel?: string;
	pending?: boolean;
	confirmColorPalette?: string;
	confirmDisabled?: boolean;
};

export const DialogConfirmFooter = ({
	onCancel,
	onConfirm,
	confirmLabel,
	confirmIcon,
	cancelLabel = 'Cancel',
	pending = false,
	confirmColorPalette,
	confirmDisabled = false,
}: DialogConfirmFooterProps) => (
	<HStack gap={2}>
		<Button
			size="md"
			variant="subtle"
			onClick={onCancel}
			disabled={pending}
		>
			{cancelLabel}
		</Button>
		<Button
			size="md"
			colorPalette={confirmColorPalette}
			onClick={onConfirm}
			disabled={pending || confirmDisabled}
			loading={pending}
		>
			{confirmIcon}
			{confirmLabel}
		</Button>
	</HStack>
);
