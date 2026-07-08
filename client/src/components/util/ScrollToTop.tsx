import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useEffect(() => {
		if (navigationType === 'POP') return;

		window.scrollTo(0, 0);
		document.documentElement.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, [key, navigationType]);

	return null;
};
