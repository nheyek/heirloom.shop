import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// TEMPORARY diagnostic: live scroll numbers, readable on a phone
// screen. Remove once the mobile scroll issue is resolved.
export const ScrollDebugReadout = () => {
	const [text, setText] = useState('');

	useEffect(() => {
		let raf: number;
		const tick = () => {
			const vv = window.visualViewport;
			setText(
				`scrollY=${Math.round(window.scrollY)} ` +
					`pageTop=${vv ? Math.round(vv.pageTop) : '?'} ` +
					`offsetTop=${vv ? Math.round(vv.offsetTop) : '?'} ` +
					`docH=${document.documentElement.scrollHeight}`,
			);
			raf = requestAnimationFrame(tick);
		};
		tick();
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<Box
			position="fixed"
			bottom={1}
			left={1}
			zIndex={99999}
			bg="blackAlpha.800"
			color="lime"
			fontSize="11px"
			fontFamily="monospace"
			px={2}
			py={1}
			pointerEvents="none"
		>
			{text}
		</Box>
	);
};
