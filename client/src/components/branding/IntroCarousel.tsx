import {
	Box,
	Carousel,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react';
import { displayFontFamily } from '@client/theme';
import { JSX } from 'react';
import { IconType } from 'react-icons';
import { FaBox, FaCrown, FaHeart } from 'react-icons/fa6';

type IntroItem = {
	Icon: IconType;
	text: JSX.Element;
};

const introItems: IntroItem[] = [
	{
		Icon: FaCrown,
		text: (
			<>
				An exhibition of
				<br />
				premier craftsmanship
			</>
		),
	},
	{
		Icon: FaHeart,
		text: (
			<>
				Discover and save
				<br />
				shops and listings
			</>
		),
	},
	{
		Icon: FaBox,
		text: (
			<>
				Free shipping & returns
				<br />
				on all orders
			</>
		),
	},
];

export const IntroCarousel = () => {
	const slidesPerPage = useBreakpointValue({ base: 1, md: 3 }) || 1;
	const showControls = slidesPerPage < introItems.length;

	return (
		<Carousel.Root
			slideCount={introItems.length}
			slidesPerPage={slidesPerPage}
			loop
			width="100%"
			maxW={1000}
		>
			<Carousel.ItemGroup>
				{introItems.map((item, index) => (
					<Carousel.Item
						key={index}
						index={index}
					>
						<Stack
							alignItems="center"
							justifyContent="start"
							gap={3}
							py={2}
						>
							<item.Icon size={24} />
							<Text
								fontSize={22}
								textAlign="center"
								fontFamily={displayFontFamily}
							>
								{item.text}
							</Text>
						</Stack>
					</Carousel.Item>
				))}
			</Carousel.ItemGroup>

			{showControls && (
				<Box mt={2}>
					<Carousel.Indicators />
				</Box>
			)}
		</Carousel.Root>
	);
};
