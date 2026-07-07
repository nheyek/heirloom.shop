import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
	// location.key changes on every navigation (including to the same
	// pathname), unlike pathname alone.
	const { key } = useLocation();

	// Layout effect so the reset happens before paint — a plain effect
	// can lose the race against the browser's own scroll adjustments,
	// leaving the new page scrolled to the old position.
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, [key]);

	return null;
};
