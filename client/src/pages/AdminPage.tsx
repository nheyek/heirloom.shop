import {
	Skeleton,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { Layout } from '@client/constants';
import { useUserInfo } from '@client/providers/UserProvider';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
	const { user, isLoading: userIsLoading } = useUserInfo();
	const navigate = useNavigate();
	const layout = useBreakpointValue({
		base: Layout.COMPACT,
		md: Layout.STANDARD,
	});

	if (!userIsLoading && !user?.isAdmin) {
		navigate('/');
	}

	const isLoading = userIsLoading;

	return (
		<Stack
			gap={5}
			m={5}
		>
			{isLoading && (
				<Skeleton
					h={10}
					w="100%"
				/>
			)}
		</Stack>
	);
};
