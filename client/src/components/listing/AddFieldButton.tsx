import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa6';

type Props = ButtonProps & {
	children: ReactNode;
};

export const AddFieldButton = ({ children, ...props }: Props) => (
	<Button
		size="md"
		fontSize={18}
		variant="subtle"
		{...props}
	>
		<FaPlus />
		{children}
	</Button>
);
