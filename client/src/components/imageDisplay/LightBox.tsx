import {
	AspectRatio,
	Carousel,
	Dialog,
	HStack,
	IconButton,
	IconButtonProps,
	Image,
	useCarouselContext,
} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { IoClose } from 'react-icons/io5';

type Props = {
	urls: string[];
	setPage: (page: number | null) => void;
	page: number | null;
	aspectRatio: number;
};

export const LightBox = (props: Props) => {
	return (
		<Dialog.Root
			initialFocusEl={() => null}
			size="xl"
			open={props.page !== null}
			onInteractOutside={() => {
				props.setPage(null);
			}}
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content
					bg="transparent"
					shadow="none"
				>
					<Dialog.Body
						display="flex"
						alignItems="center"
						justifyContent="center"
						p={0}
					>
						<Carousel.Root
							slideCount={props.urls.length}
							page={props.page || 0}
							onPageChange={(e) =>
								props.setPage(e.page)
							}
						>
							<ActionButton
								onClick={() => props.setPage(null)}
								top={5}
								right={5}
								size="2xs"
							>
								<IoClose />
							</ActionButton>
							<Carousel.Control>
								<Carousel.PrevTrigger
									asChild
									insetStart={10}
								>
									<ActionButton>
										<FaArrowLeft />
									</ActionButton>
								</Carousel.PrevTrigger>

								<Carousel.ItemGroup
									aspectRatio={props.aspectRatio}
								>
									{props.urls.map((src, index) => (
										<Carousel.Item
											key={index}
											index={index}
											overflow="hidden"
										>
											<Image
												src={src}
												objectFit="cover"
												aspectRatio={
													props.aspectRatio
												}
												borderRadius={5}
											/>
										</Carousel.Item>
									))}
								</Carousel.ItemGroup>

								<Carousel.NextTrigger
									asChild
									insetEnd={10}
								>
									<ActionButton>
										<FaArrowRight />
									</ActionButton>
								</Carousel.NextTrigger>
							</Carousel.Control>

							<CarouselThumbnails
								urls={props.urls}
								aspectRatio={props.aspectRatio}
							/>
						</Carousel.Root>
					</Dialog.Body>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};

const CarouselThumbnails = (props: {
	urls: string[];
	aspectRatio: number;
}) => {
	const carousel = useCarouselContext();

	return (
		<HStack justify="center">
			<Carousel.ProgressText
				mr={5}
				fontWeight="bold"
			/>
			{props.urls.map((src, index) => (
				<AspectRatio
					key={index}
					ratio={props.aspectRatio}
					width={20}
					cursor="button"
					onClick={() => carousel.scrollTo(index)}
				>
					<Image
						src={src}
						w="100%"
						h="100%"
						objectFit="cover"
						borderRadius={5}
					/>
				</AspectRatio>
			))}
		</HStack>
	);
};

const ActionButton = (props: IconButtonProps) => (
	<IconButton
		size="sm"
		variant="subtle"
		borderRadius="full"
		position="absolute"
		{...props}
	/>
);
