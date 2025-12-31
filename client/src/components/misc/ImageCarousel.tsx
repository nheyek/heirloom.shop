import type { IconButtonProps } from '@chakra-ui/react';
import { Box, Carousel, IconButton, Image } from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactElement, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
	urls: string[];
};

export const ImageCarousel = (props: Props) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const showArrows = isHovered && props.urls.length > 1;
	return (
		<Carousel.Root
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			slideCount={props.urls.length}
			maxW="2xl"
			mx="auto"
			gap="4"
			position="relative"
			colorPalette="white"
			loop
		>
			<Carousel.Control gap="4" width="full" position="relative">
				{showArrows && (
					<Carousel.PrevTrigger asChild>
						<ActionButton size="xs" insetStart={4}>
							<FaArrowLeft />
						</ActionButton>
					</Carousel.PrevTrigger>
				)}

				<Carousel.ItemGroup>
					{props.urls.map((src, index) => (
						<Carousel.Item key={index} index={index}>
							<Image src={src} width="100%" height="100%" objectFit="cover" />
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
					<Box position="absolute" bottom={10} width="full">
						<Carousel.Indicators
							opacity="0.5"
							_current={{ bg: 'colorPalette.subtle', opacity: 1 }}
						/>
					</Box>
				)}
			</Carousel.Control>
		</Carousel.Root>
	);
};

const MotionIconButton = motion(IconButton);
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
