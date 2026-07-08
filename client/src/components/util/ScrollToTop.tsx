import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useEffect(() => {
		if (navigationType === 'POP') return;

		document
			.getElementById('anchor')
			?.scrollIntoView({ behavior: 'instant' });
	}, [key, navigationType]);

	return null;
};
