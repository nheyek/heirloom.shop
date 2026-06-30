import { createToaster } from '@chakra-ui/react';

export const toaster = createToaster({
	placement: 'top',
	duration: 3000,
});

export const toastError = (title: string, description?: string) => {
	toaster.create({ type: 'error', title, description });
};

export const toastSuccess = (title: string, description?: string) => {
	toaster.create({ type: 'success', title, description });
};
