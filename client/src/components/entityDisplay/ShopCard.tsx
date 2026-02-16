import {
	Box,
	Card,
	Heading,
	Link,
	SimpleGrid,
	Text,
} from '@chakra-ui/react';
import { ShopCardData } from '@common/types/ShopCardData';
import { Link as RouterLink } from 'react-router-dom';
import {
	CategoryIconCode,
	CLIENT_ROUTES,
	CountryCode,
} from '../../constants';
import { FONT_DISPLAY_SLAB } from '../../theme';
import { CategoryIcon } from '../icons/CategoryIcon';
import { CountryFlagIcon } from '../icons/CountryFlagIcon';
import { AppImage } from '../imageDisplay/AppImage';

export const ShopCard = (
	props: ShopCardData & { width?: number },
) => {
	const shopUrl = `/${CLIENT_ROUTES.shop}/${props.shortId}`;

	return (
		<Box>
			<Card.Root
				variant="elevated"
				width={props.width}
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
					gap={0.5}
				>
					<RouterLink to={shopUrl}>
						<Link asChild>
							<Heading
								size="2xl"
								fontWeight="semibold"
								truncate
							>
								{props.title}
							</Heading>
						</Link>
					</RouterLink>

					<SimpleGrid
						columns={2}
						gapY={1}
						gridTemplateColumns="30px 1fr"
						fontSize={18}
						fontFamily={FONT_DISPLAY_SLAB}
						alignItems="center"
					>
						<CategoryIcon
							iconCode={
								props.categoryIcon as CategoryIconCode | null
							}
							size={22}
						/>
						<Text truncate>{props.classification}</Text>
						<CountryFlagIcon
							countryCode={
								props.countryCode as CountryCode | null
							}
							size={22}
						/>
						<Text truncate>{props.location}</Text>
					</SimpleGrid>
				</Card.Body>
			</Card.Root>
		</Box>
	);
};
