import type { IconButtonProps } from '@chakra-ui/react';
import {
	Box,
	Carousel,
	IconButton,
	Stack,
	useMediaQuery,
} from '@chakra-ui/react';
import { AppImage } from '@client/components/imageDisplay/AppImage';
import { ImageSource } from '@client/utils/imageUtils';
import {
	Fragment,
	ReactElement,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const OVERLAY_MARGIN = 2;
const OVERLAY_GAP = 1;
const HOVER_MEDIA_QUERY = '(hover: hover)';

type Props = {
	urls: ImageSource[];
	aspectRatio?: number;
	onImageClick?: () => void;
	overlayElements?: ReactNode[];
};

export const MultiImage = (props: Props) => {
	const [canHover] = useMediaQuery([HOVER_MEDIA_QUERY]);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [page, setPage] = useState<number>(0);
	const hasMultiple = props.urls.length > 1;
	const showArrows = isHovered && hasMultiple;
	const primaryImage = props.urls[0] || null;

	useEffect(() => {
		setPage(0);
	}, [primaryImage]);

	return (
		<Carousel.Root
			page={page}
			onPageChange={(details) => setPage(details.page)}
			slideCount={props.urls.length}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			colorPalette="white"
			loop
			width="100%"
			aspectRatio={props.aspectRatio}
		>
			<Carousel.Control
				width="100%"
				height="100%"
			>
				<Carousel.ItemGroup
					width="100%"
					height="100%"
				>
					{props.urls.map((source, index) => (
						<Carousel.Item
							key={index}
							index={index}
						>
							<Box position="relative">
								<AppImage
									aspectRatio={props.aspectRatio}
									fallbackSrc={source.fallback}
									imageProps={{
										src: source.url,
										...(index > 0 && {
											loading: 'lazy',
										}),
										onClick: props.onImageClick,
										...(props.onImageClick && {
											cursor: 'pointer',
										}),
									}}
								/>
								{index === 0 && (
									<Stack
										position="absolute"
										top={OVERLAY_MARGIN}
										left={OVERLAY_MARGIN}
										gap={OVERLAY_GAP}
										alignItems="flex-start"
										pointerEvents="none"
									>
										{props.overlayElements?.map(
											(element, i) => (
												<Fragment key={i}>
													{element}
												</Fragment>
											),
										)}
									</Stack>
								)}
							</Box>
						</Carousel.Item>
					))}
				</Carousel.ItemGroup>

				{canHover && hasMultiple && (
					<>
						<Carousel.PrevTrigger asChild>
							<ActionButton
								insetStart={4}
								visible={showArrows}
							>
								<FaArrowLeft />
							</ActionButton>
						</Carousel.PrevTrigger>

						<Carousel.NextTrigger asChild>
							<ActionButton
								insetEnd="4"
								visible={showArrows}
							>
								<FaArrowRight />
							</ActionButton>
						</Carousel.NextTrigger>
					</>
				)}

				{hasMultiple && (
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
		size="xs"
		variant="subtle"
		position="absolute"
		opacity={visible ? 1 : 0}
		pointerEvents={visible ? 'auto' : 'none'}
		transition="opacity 0.25s ease-in-out"
	/>
);
