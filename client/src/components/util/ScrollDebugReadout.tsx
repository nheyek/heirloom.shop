import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// TEMPORARY diagnostic: live scroll numbers, readable on a phone
// screen. Remove once the mobile scroll issue is resolved.
export const ScrollDebugReadout = () => {
	const [text, setText] = useState('');

	useEffect(() => {
		let raf: number;
		const tick = () => {
			const content = document.querySelector(
				'[data-debug="content"]',
			);
			const banner = document.querySelector(
				'[data-debug="banner"]',
			);
			const contentInfo = content
				? `contentTop=${Math.round(content.getBoundingClientRect().top)} ` +
					`contentPT=${getComputedStyle(content).paddingTop}`
				: 'content=?';
			let bannerInfo = 'banner=?';
			if (banner) {
				const r = banner.getBoundingClientRect();
				bannerInfo =
					`bannerTop=${Math.round(r.top)} ` +
					`bannerH=${Math.round(r.height)} ` +
					`bannerRatio=${(r.width / r.height).toFixed(2)}`;
			}
			const mdMatch = window.matchMedia(
				'(min-width: 900px)',
			).matches;
			setText(
				`scrollY=${Math.round(window.scrollY)} ` +
					`${contentInfo} | ${bannerInfo} | ` +
					`mdMQ=${mdMatch} innerW=${window.innerWidth}`,
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
