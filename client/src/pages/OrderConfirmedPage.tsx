import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { displayFontFamily } from '@client/theme';
import { FaScroll } from 'react-icons/fa';
import { FaArrowRight, FaCircleCheck } from 'react-icons/fa6';
import { Link, Navigate, useLocation } from 'react-router-dom';

export const OrderConfirmedPage = () => {
	const { state } = useLocation();
	const shortId: string | undefined = state?.shortId;
	const accessKey: string | undefined = state?.accessKey;

	if (!shortId || !accessKey)
		return (
			<Navigate
				to="/"
				replace
			/>
		);

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
					gap={5}
					alignItems="center"
				>
					<FaCircleCheck size={54} />

					<Text
						fontSize={44}
						fontFamily={displayFontFamily}
					>
						Order Confirmed
					</Text>

					<Stack width={200}>
						<Link to={orderPath}>
							<Button
								size="lg"
								fontSize={20}
								width="100%"
							>
								<FaScroll />
								View details
							</Button>
						</Link>
						<Link to="/">
							<Button
								size="lg"
								variant="outline"
								fontSize={20}
								width="100%"
							>
								Keep looking
								<FaArrowRight />
							</Button>
						</Link>
					</Stack>
				</Stack>
			</Center>
		</Box>
	);
};
