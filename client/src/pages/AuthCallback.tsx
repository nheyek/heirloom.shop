import { Box } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { AppError } from '../components/disclosure/AppError';

export const AuthCallback = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const error = searchParams.get('error');
	const errorDescr = searchParams.get('error_description');

	if (error) {
		return (
			<Box p={5}>
				<AppError title="Login failed" content={errorDescr || ''}></AppError>
			</Box>
		);
	}

	return null;
};
