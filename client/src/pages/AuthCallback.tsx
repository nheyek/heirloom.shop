import { useSearchParams } from 'react-router-dom';
import { AppError } from '../components/feedback/AppError';

export const AuthCallback = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const error = searchParams.get('error');
	const errorDescr = searchParams.get('error_description');

	if (error) {
		return (
			<AppError
				title="Login failed"
				content={errorDescr || ''}
			></AppError>
		);
	}

	return null;
};
