import {
	Button,
	CloseButton,
	Dialog,
	HStack,
	Stack,
	Switch,
	Text,
} from '@chakra-ui/react';
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
	<Dialog.Root
		open={open}
		onInteractOutside={pending ? undefined : onCancel}
		onEscapeKeyDown={pending ? undefined : onCancel}
		size="sm"
	>
		<Dialog.Backdrop />
		<Dialog.Positioner>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title
						fontSize={22}
						fontWeight={500}
						marginRight={10}
						truncate
					>
						{makeAvailable
							? `Activate "${title}"?`
							: `Deactivate "${title}"?`}
					</Dialog.Title>
					<CloseButton
						position="absolute"
						top={3}
						right={3}
						onClick={onCancel}
						disabled={pending}
					/>
				</Dialog.Header>
				<Dialog.Body
					pt={0}
					fontSize={18}
				>
					{makeAvailable ? (
						<Text>
							This listing will immediately be available
							for purchase.
						</Text>
					) : (
						<Stack gap={2}>
							<Text>
								This listing will no longer be
								available for purchase. It will still
								be visible to customers.
							</Text>
							<Text>
								To remove this listing entirely, open
								the "Edit" form and click "Delete
								Listing".
							</Text>
						</Stack>
					)}
				</Dialog.Body>
				<Dialog.Footer>
					<HStack gap={2}>
						<Button
							size="md"
							fontSize={18}
							variant="outline"
							onClick={onCancel}
							disabled={pending}
						>
							Cancel
						</Button>
						<Button
							size="md"
							fontSize={18}
							onClick={onConfirm}
							loading={pending}
						>
							{makeAvailable
								? 'Activate'
								: 'Deactivate'}
						</Button>
					</HStack>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Positioner>
	</Dialog.Root>
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
