import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useLayoutEffect(() => {
		if (navigationType === 'POP') return;

		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 10);
	}, [key, navigationType]);

	return null;
};
