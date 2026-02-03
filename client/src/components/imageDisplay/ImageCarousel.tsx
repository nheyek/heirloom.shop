import type { IconButtonProps } from '@chakra-ui/react';
import {
	Box,
	Carousel,
	IconButton,
	Image,
	Skeleton,
} from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactElement, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
	urls: string[];
	aspectRatio?: number;
	onImageClick?: () => void;
};

export const ImageCarousel = (props: Props) => {
	const loadedImagesCount = useRef<number>(0);
	const [allImagesLoaded, setAllImagesLoaded] =
		useState<boolean>(false);

	const [isHovered, setIsHovered] =
		useState<boolean>(false);
	const showArrows = isHovered && props.urls.length > 1;

	return (
		<Skeleton
			loading={!allImagesLoaded}
			aspectRatio={props.aspectRatio}
		>
			<Carousel.Root
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				slideCount={props.urls.length}
				colorPalette="white"
				loop
			>
				<Carousel.Control>
					{showArrows && (
						<Carousel.PrevTrigger asChild>
							<ActionButton
								size="xs"
								insetStart={4}
							>
								<FaArrowLeft />
							</ActionButton>
						</Carousel.PrevTrigger>
					)}

					<Carousel.ItemGroup>
						{props.urls.map((src, index) => (
							<Carousel.Item
								key={index}
								index={index}
							>
								<Image
									onClick={
										props.onImageClick
									}
									aspectRatio={
										props.aspectRatio
									}
									width="100%"
									height="100%"
									src={src}
									onLoad={() => {
										loadedImagesCount.current += 1;
										if (
											loadedImagesCount.current ===
											props.urls
												.length
										) {
											setAllImagesLoaded(
												true,
											);
										}
									}}
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
						<Box
							position="absolute"
							bottom={5}
							width="full"
						>
							<Carousel.Indicators
								opacity="0.5"
								_current={{
									bg: 'colorPalette.subtle',
									opacity: 1,
								}}
							/>
						</Box>
					)}
				</Carousel.Control>
			</Carousel.Root>
		</Skeleton>
	);
};

const MotionIconButton = motion.create(IconButton);
type ActionButtonProps = Omit<
	IconButtonProps,
	keyof HTMLMotionProps<'button'>
> & {
	children: ReactElement;
};
const ActionButton = (props: ActionButtonProps) => (
	<MotionIconButton
		{...props}
		size="2xs"
		variant="surface"
		position="absolute"
		zIndex="1"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5, ease: 'easeInOut' }}
	/>
);
