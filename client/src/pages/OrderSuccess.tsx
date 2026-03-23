import { Box, Center, HStack, Text } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

export const OrderSuccess = () => {
	return (
		<Box
			position="absolute"
			top={0}
			bottom={0}
			left={0}
			right={0}
		>
			<Center height="100%">
				<HStack gap={3}>
					<FaCheckCircle size={36} />

					<Text fontSize={36}>Order Placed</Text>
				</HStack>
			</Center>
		</Box>
	);
};
