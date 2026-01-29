import { Box, Carousel, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { JSX } from 'react';
import { IconType } from 'react-icons';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { GiAnvil } from 'react-icons/gi';
import { PiShieldCheckeredFill } from 'react-icons/pi';

type IntroItem = {
	Icon: IconType;
	text: JSX.Element;
};

const introItems: IntroItem[] = [
	{
		Icon: GiAnvil,
		text: (
			<>
				An exhibition of
				<br />
				world-class craftsmanship
			</>
		),
	},
	{
		Icon: FaHandshakeSimple,
		text: (
			<>
				Connecting buyers
				<br />
				and makers directly
			</>
		),
	},
	{
		Icon: PiShieldCheckeredFill,
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
							<item.Icon size={36} />
							<Text fontSize={24} textAlign="center" textStyle="ornamental">
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
