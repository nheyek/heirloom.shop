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
			// Find every element that is actually scrolled.
			const scrolled: string[] = [];
			for (const el of document.querySelectorAll('*')) {
				if (el.scrollTop > 0) {
					const tag = el.tagName.toLowerCase();
					const cls = [...el.classList]
						.slice(0, 2)
						.join('.');
					scrolled.push(
						`${tag}${cls ? '.' + cls : ''}=${Math.round(el.scrollTop)}`,
					);
					if (scrolled.length >= 3) break;
				}
			}
			setText(
				`scrollY=${Math.round(window.scrollY)} ` +
					`bodyST=${Math.round(document.body.scrollTop)} ` +
					`pageTop=${vv ? Math.round(vv.pageTop) : '?'} ` +
					`docH=${document.documentElement.scrollHeight} ` +
					`innerH=${window.innerHeight} | ` +
					`scrolled: ${scrolled.join(' ') || 'none'}`,
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
			right={1}
			zIndex={99999}
			bg="blackAlpha.800"
			color="lime"
			fontSize="11px"
			fontFamily="monospace"
			px={2}
			py={1}
			pointerEvents="none"
			whiteSpace="pre-wrap"
		>
			{text}
		</Box>
	);
};
