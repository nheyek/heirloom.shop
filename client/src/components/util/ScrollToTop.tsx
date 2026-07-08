import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useEffect(() => {
		if (navigationType === 'POP') return;

		setTimeout(() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant',
			});
		}, 10);
	}, [key, navigationType]);

	return null;
};
