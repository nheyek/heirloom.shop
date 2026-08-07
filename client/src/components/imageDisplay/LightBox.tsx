import {
	Box,
	Carousel,
	Dialog,
	IconButton,
	IconButtonProps,
	Image,
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
			open={props.page !== null}
			onInteractOutside={() => {
				props.setPage(null);
			}}
			size="cover"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content
					bg="transparent"
					width="fit-content"
				>
					<Dialog.Body
						display="flex"
						alignItems="center"
						justifyContent="center"
						p={0}
						height="100%"
					>
						<Carousel.Root
							slideCount={props.urls.length}
							page={props.page || 0}
							onPageChange={(e) =>
								props.setPage(e.page)
							}
							loop
							height="100%"
							maxHeight="100%"
							width="fit-content"
							position="relative"
						>
							<ActionButton
								onClick={() => props.setPage(null)}
								top={5}
								right={5}
								size="xs"
							>
								<IoClose />
							</ActionButton>
							<Carousel.Control
								height="100%"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								{props.urls.length > 1 && (
									<Carousel.PrevTrigger
										asChild
										insetStart={10}
									>
										<ActionButton>
											<FaArrowLeft />
										</ActionButton>
									</Carousel.PrevTrigger>
								)}

								<Carousel.ItemGroup
									height="100%"
									aspectRatio={props.aspectRatio}
								>
									{props.urls.map((src, index) => (
										<Carousel.Item
											key={index}
											index={index}
											overflow="hidden"
											height="100%"
										>
											<Image
												src={src}
												height="100%"
												width="auto"
												mx="auto"
												objectFit="cover"
												aspectRatio={
													props.aspectRatio
												}
												borderRadius={5}
											/>
										</Carousel.Item>
									))}
								</Carousel.ItemGroup>

								{props.urls.length > 1 && (
									<Carousel.NextTrigger
										asChild
										insetEnd={10}
									>
										<ActionButton>
											<FaArrowRight />
										</ActionButton>
									</Carousel.NextTrigger>
								)}
							</Carousel.Control>

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
						</Carousel.Root>
					</Dialog.Body>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
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
