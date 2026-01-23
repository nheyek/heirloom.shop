import { Card } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const AppCard = ({ children, ...cardProps }: Card.RootProps) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeInOut' }}
		>
			<Card.Root borderRadius={5} variant="elevated" overflow="hidden" {...cardProps}>
				{children}
			</Card.Root>
		</motion.div>
	);
};
