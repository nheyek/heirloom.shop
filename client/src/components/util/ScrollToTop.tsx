import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const USER_INTENT_EVENTS = [
	'touchstart',
	'pointerdown',
	'wheel',
	'keydown',
] as const;

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useLayoutEffect(() => {
		if (navigationType === 'POP') return;

		window.scrollTo(0, 0);

		// Mobile browsers scroll on the compositor thread, and for a few
		// frames after a route swap it can still hold the previous
		// page's scroll offset. When it reconciles, that stale offset —
		// clamped to the new (short, still-loading) page's height — is
		// synced back to the main thread, landing AFTER the reset above
		// and leaving the page sitting slightly below the top. That
		// sync-back fires a normal scroll event, so hold the scroll at
		// zero until the first real user input, then get out of the way.
		const release = () => {
			window.removeEventListener('scroll', onScroll);
			for (const e of USER_INTENT_EVENTS)
				window.removeEventListener(e, release);
		};
		const onScroll = () => {
			if (window.scrollY !== 0) window.scrollTo(0, 0);
		};
		window.addEventListener('scroll', onScroll);
		for (const e of USER_INTENT_EVENTS)
			window.addEventListener(e, release, { passive: true });

		return release;
	}, [key, navigationType]);

	return null;
};
