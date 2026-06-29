import { Flex, Switch } from '@chakra-ui/react';
import { useApiClient } from '@client/hooks/useApiClient';
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

	const handleToggle = async (checked: boolean) => {
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
		if (result.error !== null) setActive(!checked);
		setPending(false);
	};

	return (
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
						onCheckedChange={({ checked }) =>
							handleToggle(checked)
						}
						size="md"
					>
						<Switch.HiddenInput />
						<Switch.Control />
					</Switch.Root>
					<ListingCardIconMenu
						items={[{ icon: FaPencil, onClick: onEdit }]}
					/>
				</Flex>
			}
		/>
	);
};
