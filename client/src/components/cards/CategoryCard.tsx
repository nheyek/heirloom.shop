import { Box, Card, Text } from '@chakra-ui/react';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ImagePlaceholder } from '@client/components/imageDisplay/ImagePlaceholder';
import { getCategoryPath } from '@client/utils/categoryUtils';
import { displayFontFamily } from '@client/theme';
import { categoryImageUrl } from '@client/utils/imageUtils';
import { CategoryTileData } from '@heirloom/common/contract';
import { Link as RouterLink } from 'react-router-dom';

const TITLE_FONT_SIZE = 32;
const TITLE_TEXT_SHADOW =
	'0 1px 2px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.35), 0 8px 16px rgba(0, 0, 0, 0.2)';

export const CategoryCard = (props: CategoryTileData) => (
	<Card.Root variant="elevated">
		<RouterLink
			to={getCategoryPath(props.id)}
		>
			<Box position="relative">
				{props.imageUuid ? (
					<AppImage
						imageProps={{
							src: categoryImageUrl(props.imageUuid),
							cursor: 'button',
						}}
					/>
				) : (
					<ImagePlaceholder />
				)}
				<Text
					position="absolute"
					bottom={2}
					left={4}
					mr={4}
					fontSize={TITLE_FONT_SIZE}
					fontWeight={600}
					fontFamily={displayFontFamily}
					color="#FFF"
					textShadow={TITLE_TEXT_SHADOW}
				>
					{props.title}
				</Text>
			</Box>
		</RouterLink>
	</Card.Root>
);
