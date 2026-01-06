import type { IconButtonProps } from '@chakra-ui/react';
import {
	Box,
	Carousel,
	Flex,
	IconButton,
	Image,
	SimpleGrid,
	useBreakpointValue,
} from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactElement, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
	height?: number;
	withThumbnailMenu?: boolean;
	urls: string[];
	aspectRatio?: string;
};

export const ImageCarousel = (props: Props) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const showArrows = isHovered && props.urls.length > 1;
	const thumbnailMenuCols = useBreakpointValue({ md: 1, xl: 2 }) || 0;
	const menuGapSize = 10;
	const thumbNailHeight = (props.height || 0) / 2 - menuGapSize / 2;

	const renderCarouselControl = () => (
		<Carousel.Control position="relative" height="100%" width="fit-content">
			{showArrows && (
				<Carousel.PrevTrigger asChild>
					<ActionButton size="xs" insetStart={4}>
						<FaArrowLeft />
					</ActionButton>
				</Carousel.PrevTrigger>
			)}

			<Carousel.ItemGroup height="100%" aspectRatio={props.aspectRatio}>
				{props.urls.map((src, index) => (
					<Carousel.Item
						key={index}
						index={index}
						overflow="hidden"
						borderRadius={props.withThumbnailMenu ? 5 : 0}
						height="100%"
					>
						<Image
							src={src}
							height="100%"
							objectFit="cover"
							aspectRatio={props.aspectRatio}
						/>
					</Carousel.Item>
				))}
			</Carousel.ItemGroup>

			{showArrows && (
				<Carousel.NextTrigger asChild>
					<ActionButton insetEnd="4">
						<FaArrowRight />
					</ActionButton>
				</Carousel.NextTrigger>
			)}

			{props.urls.length > 1 && (
				<Box position="absolute" bottom={5} width="full">
					<Carousel.Indicators
						opacity="0.5"
						_current={{ bg: 'colorPalette.subtle', opacity: 1 }}
					/>
				</Box>
			)}
		</Carousel.Control>
	);

	return (
		<Carousel.Root
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			slideCount={props.urls.length}
			position="relative"
			colorPalette="white"
			loop
		>
			{props.withThumbnailMenu ? (
				<Flex height={props.height} gap={`${menuGapSize}px`} justifyContent="center">
					{renderCarouselControl()}
					<SimpleGrid
						columns={thumbnailMenuCols}
						gap={`${menuGapSize}px`}
						autoRows="min-content"
					>
						{props.urls.slice(0, 2 * thumbnailMenuCols).map((url, index) => (
							<Carousel.Indicator
								key={index}
								index={index}
								unstyled
								height={thumbNailHeight}
								aspectRatio={props.aspectRatio}
							>
								<Image
									aspectRatio={props.aspectRatio}
									src={url}
									objectFit="cover"
									height="100%"
									borderRadius={5}
								/>
							</Carousel.Indicator>
						))}
					</SimpleGrid>
				</Flex>
			) : (
				renderCarouselControl()
			)}
		</Carousel.Root>
	);
};

const MotionIconButton = motion.create(IconButton);
type ActionButtonProps = Omit<IconButtonProps, keyof HTMLMotionProps<'button'>> & {
	children: ReactElement;
};
const ActionButton = (props: ActionButtonProps) => (
	<MotionIconButton
		{...props}
		size="2xs"
		variant="surface"
		borderRadius="full"
		position="absolute"
		zIndex="1"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5, ease: 'easeInOut' }}
	/>
);
