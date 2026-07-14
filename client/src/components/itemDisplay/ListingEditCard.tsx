import { Button, Stack, Switch, Text } from '@chakra-ui/react';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { useApiClient } from '@client/hooks/useApiClient';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ListingCardData } from '@heirloom/common/contract';
import { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { ListingCard } from './ListingCard';

type ListingAvailableDialogProps = {
	open: boolean;
	title: string;
	makeAvailable: boolean;
	pending: boolean;
	onCancel: () => void;
	onConfirm: () => void;
};

const ListingAvailableDialog = ({
	open,
	title,
	makeAvailable,
	pending,
	onCancel,
	onConfirm,
}: ListingAvailableDialogProps) => (
	<AppDialog
		title={
			makeAvailable
				? `Activate "${title}"?`
				: `Deactivate "${title}"?`
		}
		open={open}
		onCancel={onCancel}
		pending={pending}
		size="sm"
		titleProps={{ truncate: true }}
		footer={
			<DialogConfirmFooter
				onCancel={onCancel}
				onConfirm={onConfirm}
				confirmLabel={
					makeAvailable ? 'Activate' : 'Deactivate'
				}
				pending={pending}
			/>
		}
	>
		<Stack
			gap={2}
			fontSize={18}
		>
			{makeAvailable ? (
				<Text>
					This listing will immediately be available for
					purchase.
				</Text>
			) : (
				<>
					<Text>
						This listing will no longer be available for
						purchase. It will still be visible to
						customers.
					</Text>
					<Text>
						To remove this listing entirely, open the
						"Edit" form and click "Delete Listing".
					</Text>
				</>
			)}
		</Stack>
	</AppDialog>
);

type Props = ListingCardData & {
	multiImage?: boolean;
	onEdit: () => void;
};

export const ListingEditCard = ({ onEdit, ...props }: Props) => {
	const apiClient = useApiClient();
	const [available, setAvailable] = useState(props.available);
	const [pending, setPending] = useState(false);
	const [pendingChecked, setPendingChecked] = useState<
		boolean | null
	>(null);
	const [switchKey, setSwitchKey] = useState(0);

	const handleToggle = (checked: boolean) => {
		setPendingChecked(checked);
	};

	const handleCancel = () => {
		setPendingChecked(null);
		setSwitchKey((k) => k + 1);
	};

	const handleConfirm = async () => {
		if (pendingChecked === null) return;
		const checked = pendingChecked;
		setPending(true);
		const result = await callApi(
			apiClient.shopManager.setListingAvailable({
				params: {
					shopId: props.shopShortId,
					listingShortId: props.shortId,
				},
				body: { available: checked },
			}),
		);
		setPending(false);
		setPendingChecked(null);
		if (result.error !== null) {
			toastError('Failed to update listing. Please try again.');
		} else {
			setAvailable(checked);
		}
	};

	return (
		<>
			<ListingCard
				{...props}
				available={available}
				topRight={
					<Button
						size="sm"
						variant="subtle"
						onClick={onEdit}
						fontSize={20}
					>
						<FaPencil />
						Edit
					</Button>
				}
				actionMenu={
					<Switch.Root
						key={switchKey}
						checked={available}
						disabled={pending}
						onCheckedChange={({ checked }) =>
							handleToggle(checked)
						}
						size="lg"
						pr={1}
					>
						<Switch.HiddenInput />
						<Switch.Control />
					</Switch.Root>
				}
			/>

			<ListingAvailableDialog
				open={pendingChecked === true}
				title={props.title}
				makeAvailable
				pending={pending}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
			<ListingAvailableDialog
				open={pendingChecked === false}
				title={props.title}
				makeAvailable={false}
				pending={pending}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
		</>
	);
};
