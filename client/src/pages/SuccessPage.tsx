import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import { IoBagCheckOutline, IoReceipt } from 'react-icons/io5';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { CLIENT_ROUTES } from '@client/constants';
import { FONT_DECORATIVE } from '@client/theme';

export const OrderSuccess = () => {
	const { state } = useLocation();
	const shortId: string | undefined = state?.shortId;
	const accessKey: string | undefined = state?.accessKey;

	if (!shortId || !accessKey) return <Navigate to="/" replace />;

	const orderPath = `/${CLIENT_ROUTES.order}/${shortId}?key=${accessKey}`;

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
						<IoBagCheckOutline size={50} />

						<Text
							fontSize={40}
							fontFamily={FONT_DECORATIVE}
						>
							Order Confirmed
						</Text>
					</Stack>

					<Stack width={200}>
						<Link to={orderPath}>
							<Button
								size="lg"
								fontSize={18}
								width="100%"
							>
								<IoReceipt />
								View details
							</Button>
						</Link>
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
