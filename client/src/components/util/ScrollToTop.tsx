import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useLayoutEffect(() => {
		if (navigationType === 'POP') return;

		window.scrollTo(0, 0);

		// Mobile browsers collapse their URL/tab bar as the page scrolls
		// down, then force it back open the moment a navigation happens
		// (so the new page's address is visible). If the toolbar had
		// collapsed — which only happens once scrolled far enough down —
		// that forced re-expansion shrinks the visible viewport a beat
		// after the reset above already ran, on the browser's own
		// animation timing rather than ours, leaving a residual offset
		// proportional to how far down the page had been. Re-zero once
		// when that resize fires; it's a single transition, so the
		// listener removes itself after the first event.
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
