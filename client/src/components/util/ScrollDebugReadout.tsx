import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// TEMPORARY diagnostic: live scroll numbers, readable on a phone
// screen. Remove once the mobile scroll issue is resolved.
export const ScrollDebugReadout = () => {
	const [text, setText] = useState('');

	useEffect(() => {
		let raf: number;
		const tick = () => {
			// Any element actually scrolled?
			let scrolled = 'none';
			for (const el of document.querySelectorAll('*')) {
				if (el.scrollTop > 0) {
					scrolled = `${el.tagName.toLowerCase()}=${Math.round(el.scrollTop)}`;
					break;
				}
			}
			// Where do the structural containers actually sit?
			const bodyTop = Math.round(
				document.body.getBoundingClientRect().top,
			);
			const root = document.getElementById('root');
			const rootTop = root
				? Math.round(root.getBoundingClientRect().top)
				: '?';
			// Any transformed ancestor shifting content?
			let transformed = 'none';
			for (const el of document.querySelectorAll(
				'body, #root, #root > *, #root > * > *',
			)) {
				const t = getComputedStyle(el).transform;
				if (t && t !== 'none') {
					transformed = `${el.tagName.toLowerCase()} ${t.slice(0, 40)}`;
					break;
				}
			}
			setText(
				`scrollY=${Math.round(window.scrollY)} ` +
					`scrolled=${scrolled} ` +
					`bodyTop=${bodyTop} rootTop=${rootTop} ` +
					`docH=${document.documentElement.scrollHeight} ` +
					`innerH=${window.innerHeight} | ` +
					`xform: ${transformed}`,
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
