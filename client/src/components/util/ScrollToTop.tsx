import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Proactively scroll to top the instant an internal link is clicked,
// before React Router swaps in the new (often much shorter) page.
// Waiting until after the swap forces the browser to abruptly clamp a
// large existing scroll offset down to fit a suddenly-shorter document
// — on iOS Safari that abrupt clamp is a known trigger for compositing
// glitches around position: sticky elements (a visible flash over the
// navbar), and the further scrolled you were, the bigger the clamp and
// the more likely the glitch. Scrolling to top on the *old*, still
// full-height page is an ordinary same-page scroll with nothing to
// glitch on.
const usePreNavigationScrollReset = () => {
	useEffect(() => {
		const onClickCapture = (e: MouseEvent) => {
			if (
				e.defaultPrevented ||
				e.button !== 0 ||
				e.metaKey ||
				e.ctrlKey ||
				e.shiftKey ||
				e.altKey
			)
				return;
			const anchor = (e.target as HTMLElement).closest?.(
				'a[href]',
			) as HTMLAnchorElement | null;
			if (!anchor) return;
			if (anchor.target && anchor.target !== '_self') return;
			if (!anchor.getAttribute('href')?.startsWith('/')) return;
			window.scrollTo(0, 0);
		};
		document.addEventListener('click', onClickCapture, true);
		return () =>
			document.removeEventListener(
				'click',
				onClickCapture,
				true,
			);
	}, []);
};

export const ScrollToTop = () => {
	const { key } = useLocation();
	const navigationType = useNavigationType();

	usePreNavigationScrollReset();

	// Backstop for navigations not triggered by a plain link click
	// (e.g. programmatic navigate() calls).
	useEffect(() => {
		if (navigationType === 'POP') return;
		window.scrollTo(0, 0);
	}, [key, navigationType]);

	return null;
};
