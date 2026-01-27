import { Box, Card } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export const AppCard = ({ children, ...cardProps }: Card.RootProps) => {
	return (
		<MotionBox
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeInOut' }}
		>
			<Card.Root variant="elevated" overflow="hidden" {...cardProps}>
				{children}
			</Card.Root>
		</MotionBox>
	);
};
