import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useLayoutEffect(() => {
		if (navigationType === 'POP') return;

		// On mobile, the compositor can keep rendering the page's
		// content layer with a stale scroll translation from before the
		// navigation, while the main thread already reads scrollY=0 —
		// layout coordinates report the top, but the painted pixels sit
		// higher. Because the main thread is at 0, a plain
		// scrollTo(0, 0) is a no-op: no offset change, nothing is sent
		// to the compositor, and the stale translation persists. Force a
		// real change — nudge to 1px, then settle at 0 on the next frame
		// — so the compositor is obligated to resync.
		window.scrollTo(0, 1);
		const raf = requestAnimationFrame(() => {
			window.scrollTo(0, 0);
		});
		return () => cancelAnimationFrame(raf);
	}, [key, navigationType]);

	return null;
};
