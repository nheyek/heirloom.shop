import {
	Button,
	CloseButton,
	Dialog,
	HStack,
	Icon,
	Stack,
	Switch,
	Text,
} from '@chakra-ui/react';
import { useApiClient } from '@client/hooks/useApiClient';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ListingCardData } from '@heirloom/common/contract';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { ListingCard } from './ListingCard';

type ListingActiveDialogProps = {
	open: boolean;
	title: string;
	activate: boolean;
	pending: boolean;
	onCancel: () => void;
	onConfirm: () => void;
};

const ListingActiveDialog = ({
	open,
	title,
	activate,
	pending,
	onCancel,
	onConfirm,
}: ListingActiveDialogProps) => (
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
						{activate
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
					{activate ? (
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
							{activate ? 'Activate' : 'Deactivate'}
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
	const [active, setActive] = useState(props.active);
	const [pending, setPending] = useState(false);
	const [pendingChecked, setPendingChecked] = useState<
		boolean | null
	>(null);

	const handleToggle = (checked: boolean) => {
		setPendingChecked(checked);
	};

	const handleConfirm = async () => {
		if (pendingChecked === null) return;
		const checked = pendingChecked;
		setPending(true);
		const result = await callApi(
			apiClient.shopManager.setListingActive({
				params: {
					shopId: props.shopShortId,
					listingShortId: props.shortId,
				},
				body: { active: checked },
			}),
		);
		setPending(false);
		setPendingChecked(null);
		if (result.error !== null) {
			toastError('Failed to update listing. Please try again.');
		} else {
			setActive(checked);
		}
	};

	return (
		<>
			<ListingCard
				{...props}
				active={active}
				topRight={
					<Button
						size="sm"
						variant="subtle"
						onClick={onEdit}
						fontSize={17}
					>
						<Icon width={17}>
							<FaEdit />
						</Icon>
						Edit
					</Button>
				}
				actionMenu={
					<Switch.Root
						checked={active}
						disabled={pending}
						onCheckedChange={({ checked }) =>
							handleToggle(checked)
						}
						size="md"
						pr={1}
					>
						<Switch.HiddenInput />
						<Switch.Control />
						<Switch.Label fontSize={17}>
							Available
						</Switch.Label>
					</Switch.Root>
				}
			/>

			<ListingActiveDialog
				open={pendingChecked === true}
				title={props.title}
				activate
				pending={pending}
				onCancel={() => setPendingChecked(null)}
				onConfirm={handleConfirm}
			/>
			<ListingActiveDialog
				open={pendingChecked === false}
				title={props.title}
				activate={false}
				pending={pending}
				onCancel={() => setPendingChecked(null)}
				onConfirm={handleConfirm}
			/>
		</>
	);
};
