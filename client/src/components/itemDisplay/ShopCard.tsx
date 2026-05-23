import {
	Card,
	Heading,
	HStack,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { CountryFlagIcon } from '@client/components/icons/CountryFlagIcon';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { CLIENT_ROUTES, CountryCode } from '@client/constants';
import { FONT_DECORATIVE } from '@client/theme';
import { ShopCardData } from '@heirloom/common/contract';
import { Link as RouterLink } from 'react-router-dom';

type Props = ShopCardData & {
	minWidth?: number;
};

export const ShopCard = (props: Props) => {
	const shopUrl = `/${CLIENT_ROUTES.shop}/${props.shortId}`;

	return (
		<Card.Root
			variant="elevated"
			minWidth={props.minWidth}
		>
			<RouterLink to={shopUrl}>
				<AppImage
					imageProps={{
						src: `${process.env.SHOP_PROFILE_IMAGES_URL}/${props.profileImageUuid}.jpg`,
						cursor: 'button',
					}}
				/>
			</RouterLink>
			<Card.Body
				p={3}
				fontFamily={FONT_DECORATIVE}
			>
				<Stack gap={0}>
					<RouterLink to={shopUrl}>
						<Link asChild>
							<Heading
								size="2xl"
								fontWeight="semibold"
								truncate
								display="block"
							>
								{props.title}
							</Heading>
						</Link>
					</RouterLink>
					<Text
						truncate
						fontSize={20}
					>
						{props.classification}
					</Text>
				</Stack>
				<HStack>
					<CountryFlagIcon
						countryCode={
							props.countryCode as CountryCode | null
						}
						size={20}
					/>
					<Text
						fontSize={18}
						truncate
					>
						{props.location}
					</Text>
				</HStack>
			</Card.Body>
		</Card.Root>
	);
};
