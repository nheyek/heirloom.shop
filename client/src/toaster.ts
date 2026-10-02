import { createToaster } from '@chakra-ui/react';

export const ToastType = {
	Success: 'success',
	Error: 'error',
	Info: 'info',
} as const;
export type ToastTypeValue =
	(typeof ToastType)[keyof typeof ToastType];

interface ToastAction {
	label: string;
	onClick: VoidFunction;
}

interface ToastOptions {
	action?: ToastAction;
}

const TOAST_DURATION_MS = 3000;
const TOAST_MAX_COUNT = 3;

export const toaster = createToaster({
	placement: 'top',
	duration: TOAST_DURATION_MS,
});

const dismissTimers = new Map<
	string,
	ReturnType<typeof setTimeout>
>();
const activeToastIds: string[] = [];

const dismiss = (id: string) => {
	const timer = dismissTimers.get(id);
	if (timer) clearTimeout(timer);
	dismissTimers.delete(id);
	const index = activeToastIds.indexOf(id);
	if (index !== -1) activeToastIds.splice(index, 1);
	toaster.dismiss(id);
};

const toast = (
	type: ToastTypeValue,
	title: string,
	description?: string,
	options?: ToastOptions,
) => {
	if (activeToastIds.length >= TOAST_MAX_COUNT) {
		dismiss(activeToastIds[0]);
	}

	const id = toaster.create({
		type,
		title,
		description,
		action: options?.action,
		duration: Infinity,
	});

	activeToastIds.push(id);
	dismissTimers.set(
		id,
		setTimeout(() => dismiss(id), TOAST_DURATION_MS),
	);
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
