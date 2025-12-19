import { Card } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export const AppCard = ({ children, ...cardProps }: Card.RootProps) => {
	const [isLoading, setIsLoading] = React.useState(true);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeInOut' }}
		>
			<Card.Root overflow="hidden" borderRadius="3px" variant="elevated" {...cardProps}>
				{children}
			</Card.Root>
		</motion.div>
	);
};
