import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export const FadeInBox = (
	props: Omit<
		BoxProps,
		| 'onAnimationStart'
		| 'onDragStart'
		| 'onDragEnd'
		| 'onDrag'
	>,
) => (
	<MotionBox
		{...props}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{
			duration: 0.15,
		}}
	>
		{props.children}
	</MotionBox>
);
