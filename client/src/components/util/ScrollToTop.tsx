import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useEffect(() => {
		if (navigationType === 'POP') return;

		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 1000);
	}, [key, navigationType]);

	return null;
};
