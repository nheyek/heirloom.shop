import { Box, Carousel, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { JSX } from 'react';
import { IconType } from 'react-icons';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { GiAnvil, GiGate } from 'react-icons/gi';

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
				high craftsmanship
			</>
		),
	},
	{
		Icon: FaHandshakeSimple,
		text: (
			<>
				Connecting buyers and
				<br />
				makers directly
			</>
		),
	},
	{
		Icon: GiGate,
		text: (
			<>
				No ads, no gimmicks,
				<br />
				nothing mass-produced
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
					<Carousel.Item key={index} index={index} mx={{ base: 0, lg: 5 }}>
						<Stack alignItems="center" justifyContent="start" gap={3} py={2}>
							<item.Icon size={32} />
							<Text fontSize={18} textAlign="center">
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
