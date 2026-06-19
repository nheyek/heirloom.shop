import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { RxDotFilled } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';

const hideFooterPages = [CLIENT_ROUTES.checkout];

export const Footer = () => {
	const { pathname } = useLocation();

	const hideFooter = [`/${CLIENT_ROUTES.checkout}`].includes(
		pathname,
	);

	if (hideFooter) {
		return null;
	}

	return (
		<Box
			width="100%"
			height={75}
			background="brand"
			color="#FFF"
			mt={{ base: 5, md: 10 }}
		>
			<Center height="100%">
				<Flex
					gap={1}
					fontSize={16}
					alignItems="center"
				>
					<Text>©{new Date().getFullYear()} Heirloom</Text>
					<RxDotFilled />
					<Text>support@heirloom.shop</Text>
				</Flex>
			</Center>
		</Box>
	);
};
