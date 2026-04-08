import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import { IoBagCheckOutline, IoReceipt } from 'react-icons/io5';
import { Link } from 'react-router-dom';
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
						<IoBagCheckOutline size={48} />

						<Text
							fontSize={36}
							fontFamily={FONT_DECORATIVE}
						>
							Order Confirmed
						</Text>
					</Stack>

					<Stack width={200}>
						<Button
							size="lg"
							fontSize={18}
							width="100%"
						>
							<IoReceipt />
							View details
						</Button>
						<Link to="/">
							<Button
								size="lg"
								variant="outline"
								fontSize={18}
								width="100%"
							>
								Continue browsing
							</Button>
						</Link>
					</Stack>
				</Stack>
			</Center>
		</Box>
	);
};
