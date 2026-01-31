import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { RxDotFilled } from 'react-icons/rx';
import { Logo } from '../brand/Logo';

export const Footer = () => {
	return (
		<Box width="100%" height={150} background="brand" color="#FFF" mt={10}>
			<Center height="100%" flexDir="column" gap={2}>
				<Box width={150}>
					<Logo />
				</Box>
				<Flex gap={1} fontSize={20} fontWeight={500} alignItems="center">
					<Text>©{new Date().getFullYear()} Heirloom</Text>
					<RxDotFilled />
					<Text>support@heirloom.shop</Text>
				</Flex>
			</Center>
		</Box>
	);
};
