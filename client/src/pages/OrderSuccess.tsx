import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import { FaReceipt } from 'react-icons/fa';
import { IoBagCheckOutline } from 'react-icons/io5';
import { TbSquares } from 'react-icons/tb';
import { FONT_DECORATIVE } from '../theme';

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
				<Stack
					gap={4}
					alignItems="center"
				>
					<Stack alignItems="center">
						<IoBagCheckOutline size={64} />

						<Text
							fontSize={48}
							fontFamily={FONT_DECORATIVE}
						>
							Order Confirmed
						</Text>
					</Stack>

					<Stack width={250}>
						<Button
							size="xl"
							fontSize={20}
							width="100%"
						>
							<FaReceipt />
							View details
						</Button>
						<Button
							size="xl"
							variant="outline"
							fontSize={20}
							width="100%"
						>
							<TbSquares />
							Continue browsing
						</Button>
					</Stack>
				</Stack>
			</Center>
		</Box>
	);
};
