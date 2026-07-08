import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useEffect(() => {
		if (navigationType === 'POP') return;

		setTimeout(() => {
			document
				.getElementById('anchor')
				?.scrollIntoView({ behavior: 'instant' });
		}, 100);
	}, [key, navigationType]);

	return null;
};
