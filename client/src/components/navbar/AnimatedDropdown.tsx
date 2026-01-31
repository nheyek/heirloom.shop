import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

const MotionBox = motion.create(Box);

interface AnimatedDropdownProps {
	isOpen: boolean;
	children: ReactNode;
	position?: 'absolute' | 'relative';
}

export const AnimatedDropdown = ({ isOpen, children, position = 'absolute' }: AnimatedDropdownProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<MotionBox
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
					position={position}
					top="100%"
					left={0}
					right={0}
					mt={1}
					bg="#FFF"
					borderRadius="md"
					boxShadow="md"
					overflow="hidden"
					zIndex="popover"
				>
					{children}
				</MotionBox>
			)}
		</AnimatePresence>
	);
};
