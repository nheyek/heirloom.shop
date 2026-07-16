import { createToaster } from '@chakra-ui/react';

export const ToastType = {
	Success: 'success',
	Error: 'error',
	Info: 'info',
} as const;
export type ToastTypeValue = (typeof ToastType)[keyof typeof ToastType];

interface ToastAction {
	label: string;
	onClick: VoidFunction;
}

interface ToastOptions {
	action?: ToastAction;
}

export const toaster = createToaster({
	placement: 'top',
	duration: 3000,
});

const toast = (
	type: ToastTypeValue,
	title: string,
	description?: string,
	options?: ToastOptions,
) => {
	toaster.create({ type, title, description, action: options?.action });
};

export const toastSuccess = (
	title: string,
	description?: string,
	options?: ToastOptions,
) => toast(ToastType.Success, title, description, options);

export const toastError = (
	title: string,
	description?: string,
	options?: ToastOptions,
) => toast(ToastType.Error, title, description, options);

export const toastInfo = (
	title: string,
	description?: string,
	options?: ToastOptions,
) => toast(ToastType.Info, title, description, options);
