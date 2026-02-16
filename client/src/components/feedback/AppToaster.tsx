import { Flex, Toast, Toaster } from '@chakra-ui/react';
import { FONT_DISPLAY_SANS } from 'client/src/theme';
import { FaCheck } from 'react-icons/fa6';
import { toaster } from '../../toaster';

export const AppToaster = () => {
	return (
		<Toaster toaster={toaster}>
			{(toast) => (
				<Toast.Root
					width="auto"
					fontFamily={FONT_DISPLAY_SANS}
					px={4}
					py={2}
					borderRadius={5}
					background="white"
					color="black"
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
							<Toast.Title fontSize={18}>
								{toast.title}
							</Toast.Title>
							<Toast.Description
								fontSize={16}
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
								fontSize={16}
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
	const Icon = type == 'success' ? FaCheck : null;
	if (!Icon) return null;

	return <Icon size={20} />;
};
