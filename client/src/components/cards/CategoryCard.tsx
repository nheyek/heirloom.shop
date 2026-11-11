import { Box, Card } from '@chakra-ui/react';
import { CARD_WIDTH } from '@client/constants';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ImagePlaceholder } from '@client/components/imageDisplay/ImagePlaceholder';
import { MultiLineHeading } from '@client/components/textDisplay/MultiLineHeading';
import { getCategoryPath } from '@client/utils/categoryUtils';
import { categoryImageUrl } from '@client/utils/imageUtils';
import { CategoryTileData } from '@heirloom/common/contract';
import { Link as RouterLink } from 'react-router-dom';

const TITLE_TEXT_SHADOW =
	'0 1px 2px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.35), 0 8px 16px rgba(0, 0, 0, 0.2)';

export const CategoryCard = (props: CategoryTileData) => (
	<Card.Root
		variant="elevated"
		width={CARD_WIDTH}
	>
		<RouterLink to={getCategoryPath(props.id)}>
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
				<MultiLineHeading
					position="absolute"
					bottom={3}
					left={5}
					mr={4}
					fontWeight={600}
					color="#FFF"
					textShadow={TITLE_TEXT_SHADOW}
				>
					{props.title}
				</MultiLineHeading>
			</Box>
		</RouterLink>
	</Card.Root>
);
