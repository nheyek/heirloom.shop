import { Image } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import { FaArrowRight } from 'react-icons/fa';

export const ImageCarousel = () => {
	return (
		<>
			<Demo />
		</>
	);
};

import type { IconButtonProps } from '@chakra-ui/react';
import { Box, Carousel, IconButton } from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';

const Demo = () => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	return (
		<Carousel.Root
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			slideCount={items.length}
			maxW="2xl"
			mx="auto"
			gap="4"
			position="relative"
			colorPalette="white"
		>
			<Carousel.Control gap="4" width="full" position="relative">
				{isHovered && (
					<Carousel.PrevTrigger asChild>
						<ActionButton size="xs" insetStart={4}>
							<FaArrowLeft />
						</ActionButton>
					</Carousel.PrevTrigger>
				)}

				<Carousel.ItemGroup>
					{items.map((src, index) => (
						<Carousel.Item key={index} index={index}>
							<Image
								src={src}
								alt={`Product ${index + 1}`}
								width="100%"
								height="100%"
								objectFit="cover"
							/>
						</Carousel.Item>
					))}
				</Carousel.ItemGroup>

				{isHovered && (
					<Carousel.NextTrigger asChild>
						<ActionButton insetEnd="4">
							<FaArrowRight />
						</ActionButton>
					</Carousel.NextTrigger>
				)}

				<Box position="absolute" bottom={5} width="full">
					<Carousel.Indicators
						opacity="0.5"
						boxSize="1.5"
						_current={{ bg: 'colorPalette.subtle', opacity: 1 }}
					/>
				</Box>
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
		transition={{ duration: 0.35, ease: 'easeInOut' }}
	/>
);

const items = [
	'https://images.unsplash.com/photo-1656433031375-5042f5afe894?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371',
	'https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2673',
	'https://images.unsplash.com/photo-1629581688635-5d88654e5bdd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2831',
	'https://images.unsplash.com/photo-1661030420948-862787de0056?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2370',
	'https://images.unsplash.com/photo-1703505841379-2f863b201212?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371',
	'https://images.unsplash.com/photo-1607776905497-b4f788205f6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2370',
];
