import { Flex, Icon, Toast, Toaster } from '@chakra-ui/react';
import { ToastType, toaster } from '@client/toaster';
import type { IconType } from 'react-icons';
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaInfoCircle,
} from 'react-icons/fa';

export const AppToaster = () => {
	return (
		<Toaster toaster={toaster}>
			{(toast) => {
				const iconType = getToastIcon(toast.type as string);
				return (
					<Toast.Root
						maxW="90vw"
						w="auto"
						px={4}
						py={2}
						borderRadius={5}
						background={
							toast.type === ToastType.Success
								? 'green.success'
								: toast.type === ToastType.Error
									? 'red.error'
									: 'white'
						}
						color={
							toast.type === ToastType.Success ||
							toast.type === ToastType.Error
								? 'white'
								: 'black'
						}
					>
						<Flex
							gap={4}
							alignItems="center"
						>
							{iconType && (
								<Icon
									as={iconType}
									size="md"
								/>
							)}
							<Flex
								direction="column"
								gap={0}
								minW={0}
								flex="1"
							>
								<Toast.Title
									fontSize={18}
									wordBreak="break-word"
								>
									{toast.title}
								</Toast.Title>
								<Toast.Description
									fontSize={16}
									wordBreak="break-word"
								>
									{toast.description}
								</Toast.Description>
							</Flex>
							{toast.action && (
								<Toast.ActionTrigger
									cursor="pointer"
									whiteSpace="nowrap"
									fontSize={16}
									border="1px solid"
								>
									{toast.action.label}
								</Toast.ActionTrigger>
							)}
						</Flex>
					</Toast.Root>
				);
			}}
		</Toaster>
	);
};

const getToastIcon = (type: string): IconType | null => {
	if (type === ToastType.Success) return FaCheckCircle;
	if (type === ToastType.Error) return FaExclamationCircle;
	if (type === ToastType.Info) return FaInfoCircle;
	return null;
};
