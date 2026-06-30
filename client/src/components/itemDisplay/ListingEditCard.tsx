import {
	Button,
	CloseButton,
	Dialog,
	Flex,
	HStack,
	Switch,
	Text,
} from '@chakra-ui/react';
import { useApiClient } from '@client/hooks/useApiClient';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ListingCardData } from '@heirloom/common/contract';
import { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { ListingCard, ListingCardIconMenu } from './ListingCard';

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
				<Dialog.Body pt={0}>
					<Text fontSize={18}>
						{activate
							? 'This listing will become visible to shoppers.'
							: 'This listing will be hidden from shoppers.'}
					</Text>
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
				actionMenu={
					<Flex
						alignItems="center"
						gap={2}
					>
						<Switch.Root
							checked={active}
							disabled={pending}
							onCheckedChange={({ checked }) =>
								handleToggle(checked)
							}
							size="md"
						>
							<Switch.HiddenInput />
							<Switch.Control />
						</Switch.Root>
						<ListingCardIconMenu
							items={[
								{ icon: FaPencil, onClick: onEdit },
							]}
						/>
					</Flex>
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
