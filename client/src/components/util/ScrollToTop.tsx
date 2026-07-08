import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useLayoutEffect(() => {
		if (navigationType === 'POP') return;

		window.scrollTo(0, 0);

		// Mobile browsers auto-collapse/expand the URL/tab bar based on
		// scroll direction. If it re-expands right after we reset to 0,
		// the visual viewport shrinks and the page appears scrolled down
		// by the bar's height even though scrollY may still read 0. This
		// resizes visualViewport (not window), so re-zero once that
		// settling resize fires; it's a single show/hide transition, so
		// the listener removes itself after the first event.
		const vv = window.visualViewport;
		if (!vv) return;

		const reset = () => {
			window.scrollTo(0, 0);
			vv.removeEventListener('resize', reset);
		};
		vv.addEventListener('resize', reset);
		return () => vv.removeEventListener('resize', reset);
	}, [key, navigationType]);

	return null;
};
