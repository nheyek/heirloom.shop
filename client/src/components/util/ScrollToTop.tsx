import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Intercepts internal link clicks and, if the page is currently
// scrolled, delays the actual route change until scroll-to-top has
// genuinely finished and painted. Doing the DOM swap while still
// scrolled forces the browser to clamp a large scroll offset against a
// suddenly-different document in the same paint pass — on mobile this
// produces a visible compositor desync (parts of the old page and new
// page rendered simultaneously, mid-repaint) rather than a clean
// transition. Scrolling to top first, on the page that's still fully
// intact, and only then swapping the DOM, avoids that combination
// entirely.
export const ScrollToTop = () => {
	const navigate = useNavigate();

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
			const href = anchor.getAttribute('href');
			if (!href?.startsWith('/')) return;

			// Nothing to settle — let the click proceed as normal.
			if (window.scrollY === 0) return;

			e.preventDefault();

			let settled = false;
			const proceed = () => {
				if (settled) return;
				settled = true;
				window.removeEventListener('scrollend', proceed);
				navigate(href);
			};
			// scrollend fires once the browser considers the scroll
			// (and any of its own follow-up adjustments) fully done.
			window.addEventListener('scrollend', proceed, {
				once: true,
			});
			// Fallback for browsers without scrollend support.
			setTimeout(proceed, 150);

			window.scrollTo({ top: 0, behavior: 'instant' });
		};

		document.addEventListener('click', onClickCapture, true);
		return () =>
			document.removeEventListener(
				'click',
				onClickCapture,
				true,
			);
	}, [navigate]);

	return null;
};
