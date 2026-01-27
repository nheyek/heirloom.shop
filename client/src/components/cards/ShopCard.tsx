import { Box, Card, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { ShopCardData } from '@common/types/ShopCardData';
import { useNavigate } from 'react-router-dom';
import { CategoryIconCode, CLIENT_ROUTES, CountryCode } from '../../constants';
import { CategoryIcon } from '../icons/CategoryIcon';
import { CountryFlagIcon } from '../icons/CountryFlagIcon';
import { AppImage } from '../misc/AppImage';
import { AppCard } from './AppCard';

export const ShopCard = (props: ShopCardData & { width?: number }) => {
	const navigate = useNavigate();
	const navigateToShop = () =>
		navigate(`/${CLIENT_ROUTES.shop}/${props.id}`, { preventScrollReset: true });

	return (
		<AppCard width={props.width}>
			<AppImage
				imageProps={{
					src: `${process.env.SHOP_PROFILE_IMAGES_URL}/${props.profileImageUuid}.jpg`,
					cursor: 'button',
					onClick: navigateToShop,
				}}
			/>
			<Card.Root>
				<Card.Body p={3} overflow="hidden" gap={1}>
					<Card.Title fontSize={20}>
						<Link truncate display="block" onClick={navigateToShop}>
							{props.title}
						</Link>
					</Card.Title>
					<SimpleGrid
						columns={2}
						gapY={1}
						gridTemplateColumns="30px 1fr"
						fontSize={18}
						alignItems="center"
					>
						<CategoryIcon
							iconCode={props.categoryIcon as CategoryIconCode | null}
							size={22}
						/>
						<Text truncate>{props.classification}</Text>
						<Box width={22} height={22}>
							<CountryFlagIcon
								countryCode={props.countryCode as CountryCode | null}
							/>
						</Box>
						<Text truncate>{props.location}</Text>
					</SimpleGrid>
				</Card.Body>
			</Card.Root>
		</AppCard>
	);
};
