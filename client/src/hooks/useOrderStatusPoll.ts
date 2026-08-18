import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { OrderStatus } from '@heirloom/common/constants';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_ATTEMPTS = 30;

export const useOrderStatusPoll = () => {
	const apiClient = useApiClient();
	const navigate = useNavigate();
	const { clearCart } = useShoppingCart();
	const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
		null,
	);

	const stopPolling = () => {
		if (pollIntervalRef.current) {
			clearInterval(pollIntervalRef.current);
			pollIntervalRef.current = null;
		}
	};

	useEffect(() => stopPolling, []);

	const pollUntilPaid = (
		shortId: string,
		accessKey: string,
		callbacks: {
			onSuccess?: () => void;
			onSettled?: () => void;
		} = {},
	) => {
		const { onSuccess, onSettled } = callbacks;
		let attempts = 0;
		pollIntervalRef.current = setInterval(async () => {
			attempts++;
			const result = await callApi(
				apiClient.orders.getStatus({ params: { shortId } }),
			);
			if (
				result.error === null &&
				result.data.orderStatus ===
					OrderStatus.PAYMENT_SUCCEEDED
			) {
				stopPolling();
				onSuccess?.();
				onSettled?.();
				clearCart();
				navigate(`/${CLIENT_ROUTES.orderConfirmed}`, {
					state: { shortId, accessKey },
				});
			} else if (attempts >= POLL_MAX_ATTEMPTS) {
				stopPolling();
				onSettled?.();
				toastError(
					'Payment confirmation is taking longer than expected',
					'Check your email for order confirmation, or contact support if you were charged.',
				);
			}
		}, POLL_INTERVAL_MS);
	};

	return { pollUntilPaid };
};
