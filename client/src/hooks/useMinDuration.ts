import { useEffect, useRef, useState } from 'react';

export const useMinDuration = (
	isLoading: boolean,
	minDurationMs: number = 300,
): boolean => {
	const [shownLoading, setShownLoading] = useState(isLoading);
	const startedAtRef = useRef<number | null>(
		isLoading ? Date.now() : null,
	);

	useEffect(() => {
		if (isLoading) {
			startedAtRef.current = Date.now();
			setShownLoading(true);
			return;
		}

		const elapsed = startedAtRef.current
			? Date.now() - startedAtRef.current
			: minDurationMs;
		const remaining = Math.max(minDurationMs - elapsed, 0);

		if (remaining === 0) {
			setShownLoading(false);
			return;
		}

		const timer = setTimeout(
			() => setShownLoading(false),
			remaining,
		);
		return () => clearTimeout(timer);
	}, [isLoading, minDurationMs]);

	return shownLoading;
};
