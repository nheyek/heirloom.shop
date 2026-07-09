import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Scroll position for each visited history entry, keyed by location.key,
// so POP navigation can be restored ourselves now that the browser's
// own restoration is disabled below.
const savedScrollPositions = new Map<string, number>();

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	// With the default 'auto', the browser doesn't just fail to reset
	// scroll on an SPA navigation — it actively re-applies a remembered
	// scroll offset ASYNCHRONOUSLY, after the new page's content
	// finishes loading and the document becomes tall enough to fit that
	// old offset again. This was directly observed: scroll lands at 0,
	// sits there, then jumps back to a nonzero value once data loads.
	// 'manual' turns that off entirely; we restore POP navigation
	// ourselves below instead.
	useLayoutEffect(() => {
		window.history.scrollRestoration = 'manual';
	}, []);

	useLayoutEffect(() => {
		const onScroll = () => {
			savedScrollPositions.set(key, window.scrollY);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () =>
			window.removeEventListener('scroll', onScroll);
	}, [key]);

	useLayoutEffect(() => {
		if (navigationType === 'POP') {
			window.scrollTo(0, savedScrollPositions.get(key) ?? 0);
		} else {
			window.scrollTo(0, 0);
		}
	}, [key, navigationType]);

	return null;
};
