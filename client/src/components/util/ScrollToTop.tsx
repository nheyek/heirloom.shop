import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Scroll position for each visited history entry, keyed by location.key,
// so POP navigation can be restored ourselves now that the browser's
// own restoration is disabled below.
const savedScrollPositions = new Map<string, number>();

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useLayoutEffect(() => {
		if (navigationType === 'POP') {
			return;
		}

		window.scrollTo(0, 0);
	}, [key, navigationType]);

	return null;
};
