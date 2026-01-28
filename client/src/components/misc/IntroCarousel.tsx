import { Box, Carousel, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { JSX } from 'react';
import { IconType } from 'react-icons';
import { FaPeopleArrows, FaShieldAlt, FaStar } from 'react-icons/fa';

type IntroItem = {
	Icon: IconType;
	text: JSX.Element;
};

const introItems: IntroItem[] = [
	{
		Icon: FaStar,
		text: (
			<>
				An exhibition of
				<br />
				world-class craftsmanship
			</>
		),
	},
	{
		Icon: FaPeopleArrows,
		text: (
			<>
				Connecting buyers
				<br />
				and makers directly
			</>
		),
	},
	{
		Icon: FaShieldAlt,
		text: (
			<>
				No ads, no gimmicks,
				<br />
				guaranteed authenticity
			</>
		),
	},
];

export const IntroCarousel = () => {
	const slidesPerPage = useBreakpointValue({ base: 1, lg: 3 }) || 1;
	const showControls = slidesPerPage < introItems.length;

	return (
		<Carousel.Root slideCount={introItems.length} slidesPerPage={slidesPerPage} loop>
			<Carousel.ItemGroup>
				{introItems.map((item, index) => (
					<Carousel.Item key={index} index={index} mx={{ base: 0, lg: 10 }}>
						<Stack alignItems="center" justifyContent="start" gap={3} py={2}>
							<item.Icon size={32} />
							<Text fontSize={22} textAlign="center" textStyle="ornamental">
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
