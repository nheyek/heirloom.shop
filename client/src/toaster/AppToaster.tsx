import { Flex, Toast, Toaster } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { toaster } from '../toaster';

export const AppToaster = () => {
	return (
		<Toaster toaster={toaster}>
			{(toast) => (
				<Toast.Root
					width="auto"
					textStyle="sans"
					px={4}
					py={2}
					borderRadius={5}
				>
					<Flex
						gap={4}
						alignItems="center"
					>
						{renderIcon(toast.type as string)}
						<Flex
							direction="column"
							gap={0}
						>
							<Toast.Title fontSize={20}>
								{toast.title}
							</Toast.Title>
							<Toast.Description fontSize={16}>
								{toast.description}
							</Toast.Description>
						</Flex>
						{toast.action && (
							<Toast.ActionTrigger
								cursor="pointer"
								border="1px solid white"
								fontSize={16}
								whiteSpace="nowrap"
							>
								{toast.action.label}
							</Toast.ActionTrigger>
						)}
					</Flex>
				</Toast.Root>
			)}
		</Toaster>
	);
};

const renderIcon = (type: string) => {
	const Icon = type == 'success' ? FaCheckCircle : null;
	if (!Icon) return null;

	return <Icon size={18} />;
};
