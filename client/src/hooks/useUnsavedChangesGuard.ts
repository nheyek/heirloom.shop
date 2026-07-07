import { useEffect } from 'react';

const CONFIRM_MESSAGE =
	'You have unsaved changes. Leave this page?';

/**
 * Warns before navigating away while `when` is true.
 *
 * Browser-level navigation (reload, tab close, external URLs) gets the
 * native beforeunload dialog. In-app navigation is guarded by
 * intercepting internal link clicks in the capture phase, since the app
 * uses the declarative <BrowserRouter> (react-router's useBlocker needs
 * a data router). Programmatic navigate() calls — e.g. the redirect
 * after a successful save — are intentionally not intercepted.
 */
export const useUnsavedChangesGuard = (when: boolean) => {
	useEffect(() => {
		if (!when) return;

		const beforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
		};

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
			// Internal SPA links only; external links hit beforeunload.
			if (!anchor.getAttribute('href')?.startsWith('/')) return;
			if (!window.confirm(CONFIRM_MESSAGE)) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		window.addEventListener('beforeunload', beforeUnload);
		document.addEventListener('click', onClickCapture, true);
		return () => {
			window.removeEventListener('beforeunload', beforeUnload);
			document.removeEventListener(
				'click',
				onClickCapture,
				true,
			);
		};
	}, [when]);
};
