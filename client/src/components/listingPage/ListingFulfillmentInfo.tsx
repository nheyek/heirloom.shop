import {
	Box,
	HStack,
	Popover,
	Portal,
	Stack,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { RichTextDisplay } from '@client/components/richText/RichTextDisplay';
import { IconText } from '@client/components/textDisplay/IconText';
import { ReturnPolicyDisplay } from '@client/domain/listingPage';
import { brandColor } from '@client/theme';
import { ListingFulfillmentProfiles } from '@heirloom/common/contract';
import { formatCentsAsDollars } from '@heirloom/common/utils/priceDisplay';
import { FaExchangeAlt } from 'react-icons/fa';
import {
	FaCheckDouble,
	FaCircleInfo,
	FaHourglassStart,
	FaLocationDot,
	FaTruck,
} from 'react-icons/fa6';

type Props = {
	profiles: ListingFulfillmentProfiles | null;
	deliveryEstimate: string;
	returnPolicy: ReturnPolicyDisplay;
	directFulfillment: boolean;
};

export const ListingFulfillmentInfo = ({
	profiles,
	deliveryEstimate,
	returnPolicy,
	directFulfillment,
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
				<Popover.Root positioning={{ placement: 'top' }}>
					<Popover.Trigger
						pl={1}
						cursor="pointer"
					>
						<FaCircleInfo size={16} />
					</Popover.Trigger>
					<Portal>
						<Popover.Positioner>
							<Popover.Content maxWidth={300}>
								<Popover.Arrow />
								<Popover.Body>
									<RichTextDisplay
										htmlString={
											returnPolicy.descriptionHtml
										}
										fontSize={16}
									/>
								</Popover.Body>
							</Popover.Content>
						</Popover.Positioner>
					</Portal>
				</Popover.Root>
			)}
		</IconText>
		{directFulfillment ? (
			profiles?.shipping && (
				<IconText icon={FaLocationDot}>
					Ships from
					<b>{profiles.shipping.originZip}</b>
				</IconText>
			)
		) : (
			<IconText icon={FaCheckDouble}>
				<HStack gap={1}>
					Fulfilled by
					<Box width={76}>
						<Logo fill={brandColor} />
					</Box>
				</HStack>
			</IconText>
		)}
	</Stack>
);
