import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Scroll position for each visited history entry, keyed by location.key.
const savedPositions = new Map<string, number>();

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	// With 'auto', mobile browsers asynchronously re-apply remembered
	// scroll offsets after the new page's content loads, undoing our
	// reset. 'manual' disables all browser scroll meddling; we handle
	// back/forward restoration ourselves below.
	useEffect(() => {
		window.history.scrollRestoration = 'manual';
	}, []);

	// Track the current entry's scroll position for later restoration.
	useEffect(() => {
		const onScroll = () => {
			savedPositions.set(key, window.scrollY);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () =>
			window.removeEventListener('scroll', onScroll);
	}, [key]);

	// Layout effect so the scroll is set before the new page paints.
	useLayoutEffect(() => {
		if (navigationType === 'POP') {
			window.scrollTo(0, savedPositions.get(key) ?? 0);
		} else {
			window.scrollTo(0, 0);
		}
	}, [key, navigationType]);

	return null;
};
