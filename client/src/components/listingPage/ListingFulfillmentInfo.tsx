import { Flex, HStack, Stack } from '@chakra-ui/react';
import { InfoPopover } from '@client/components/misc/InfoPopover';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { ReturnPolicyDisplay } from '@client/domain/listingPage';
import { ListingFulfillmentProfiles } from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { IconType } from 'react-icons';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaHourglassStart, FaTruck } from 'react-icons/fa6';

type Props = {
	profiles: ListingFulfillmentProfiles | null;
	deliveryEstimate: string;
	returnPolicy: ReturnPolicyDisplay;
};

export const ListingFulfillmentInfo = ({
	profiles,
	deliveryEstimate,
	returnPolicy,
}: Props) => (
	<Stack gap={1}>
		<IconText icon={FaHourglassStart}>
			{profiles?.processing && profiles?.shipping ? (
				<>
					Estimated delivery <b>{deliveryEstimate}</b>
				</>
			) : (
				deliveryEstimate
			)}
		</IconText>
		<IconText icon={FaTruck}>
			{profiles?.shipping ? (
				<>
					Ships to continental US for{' '}
					<b>
						{profiles.shipping.shippingRate
							? formatCentsAsDollars(
									profiles.shipping.shippingRate,
								)
							: 'Free'}
					</b>
				</>
			) : (
				'Shipping info unavailable'
			)}
		</IconText>
		<IconText icon={FaExchangeAlt}>
			{returnPolicy.text}
			{returnPolicy.descriptionHtml && (
				<InfoPopover>
					<RichTextDisplay
						htmlString={returnPolicy.descriptionHtml}
						fontSize={16}
					/>
				</InfoPopover>
			)}
		</IconText>
	</Stack>
);

const IconText = (props: {
	icon: IconType;
	children: React.ReactNode;
}) => (
	<HStack
		gap={3}
		fontSize={20}
		height={30}
	>
		{<props.icon />}

		<Flex gap={1}>{props.children}</Flex>
	</HStack>
);
