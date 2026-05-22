import { Flex, Toast, Toaster } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import { MdErrorOutline } from 'react-icons/md';
import { toaster } from '@client/toaster';

export const AppToaster = () => {
	return (
		<Toaster toaster={toaster}>
			{(toast) => (
				<Toast.Root
					width="auto"
					px={4}
					py={2}
					borderRadius={5}
					background={
						toast.type === 'success'
							? 'green.success'
							: toast.type === 'error'
								? 'red.error'
								: 'white'
					}
					color={
						toast.type === 'success' || toast.type === 'error'
							? 'white'
							: 'black'
					}
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
							<Toast.Title fontSize={15}>
								{toast.title}
							</Toast.Title>
							<Toast.Description
								fontSize={14}
								maxW={150}
								truncate
							>
								{toast.description}
							</Toast.Description>
						</Flex>
						{toast.action && (
							<Toast.ActionTrigger
								cursor="button"
								whiteSpace="nowrap"
								fontSize={14}
								border="1px solid"
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
	if (type === 'success') return <FaCheck size={20} />;
	if (type === 'error') return <MdErrorOutline size={22} />;
	return null;
};
