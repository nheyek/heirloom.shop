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
		setPendingChecked(null);
		setActive(checked);
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
		if (result.error !== null) {
			setActive(!checked);
			toastError('Failed to update listing. Please try again.');
		}
		setPending(false);
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

			<Dialog.Root
				open={pendingChecked !== null}
				onInteractOutside={() => setPendingChecked(null)}
				onEscapeKeyDown={() => setPendingChecked(null)}
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
								{pendingChecked
									? `Activate "${props.title}"?`
									: `Deactivate "${props.title}"?`}
							</Dialog.Title>
							<CloseButton
								position="absolute"
								top={3}
								right={3}
								onClick={() =>
									setPendingChecked(null)
								}
							/>
						</Dialog.Header>
						<Dialog.Body pt={0}>
							<Text fontSize={18}>
								{pendingChecked
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
									onClick={() =>
										setPendingChecked(null)
									}
								>
									Cancel
								</Button>
								<Button
									size="md"
									fontSize={18}
									onClick={handleConfirm}
								>
									{pendingChecked
										? 'Activate'
										: 'Deactivate'}
								</Button>
							</HStack>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
};
