import type { IconButtonProps } from '@chakra-ui/react';
import { Box, Carousel, IconButton } from '@chakra-ui/react';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ReactElement, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
	urls: string[];
	aspectRatio?: number;
	onImageClick?: () => void;
};

export const MultiImage = (props: Props) => {
	const loadedImagesCount = useRef<number>(0);

	const [isHovered, setIsHovered] = useState<boolean>(false);
	const showArrows = isHovered && props.urls.length > 1;

	return (
		<Carousel.Root
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			slideCount={props.urls.length}
			colorPalette="white"
			loop
			width="100%"
			aspectRatio={props.aspectRatio}
		>
			<Carousel.Control
				width="100%"
				height="100%"
			>
				{props.urls.length > 1 && (
					<Carousel.PrevTrigger asChild>
						<ActionButton
							insetStart={4}
							visible={showArrows}
						>
							<FaArrowLeft />
						</ActionButton>
					</Carousel.PrevTrigger>
				)}

				<Carousel.ItemGroup
					width="100%"
					height="100%"
				>
					{props.urls.map((src, index) => (
						<Carousel.Item
							key={index}
							index={index}
						>
							<AppImage
								aspectRatio={props.aspectRatio}
								imageProps={{
									src,
									onClick: props.onImageClick,
									cursor: props.onImageClick
										? 'pointer'
										: 'auto',
								}}
							/>
						</Carousel.Item>
					))}
				</Carousel.ItemGroup>

				{props.urls.length > 1 && (
					<Carousel.NextTrigger asChild>
						<ActionButton
							insetEnd="4"
							visible={showArrows}
						>
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
	);
};

type ActionButtonProps = IconButtonProps & {
	children: ReactElement;
	visible: boolean;
};
const ActionButton = ({ visible, ...props }: ActionButtonProps) => (
	<IconButton
		{...props}
		size="2xs"
		variant="surface"
		position="absolute"
		opacity={visible ? 1 : 0}
		pointerEvents={visible ? 'auto' : 'none'}
		transition="opacity 0.25s ease-in-out"
	/>
);
