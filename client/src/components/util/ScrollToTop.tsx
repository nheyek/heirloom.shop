import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	useLayoutEffect(() => {
		if (navigationType === 'POP') return;

		window.scrollTo(0, 0);

		// Force a synchronous reflow: reading a layout-triggering
		// property right after a DOM change obligates the browser to
		// flush layout (and typically paint) now, rather than leaving
		// it to drift and settle on its own schedule.
		void document.body.offsetHeight;

		// Force the compositor to recomposite, in case it's holding a
		// stale texture for this layer rather than a stale layout: a
		// no-op transform toggle is one of the standard triggers for a
		// browser to tear down and rebuild a layer's paint. Applied to
		// <body> so it covers the whole page; invisible, since the
		// transform is identity and removed on the next frame.
		const { body } = document;
		body.style.transform = 'translateZ(0)';
		requestAnimationFrame(() => {
			body.style.transform = '';
		});
	}, [key, navigationType]);

	return null;
};
