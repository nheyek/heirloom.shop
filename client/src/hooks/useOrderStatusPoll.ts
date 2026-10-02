import { useAuth0 } from '@auth0/auth0-react';
import { useApiClient } from '@client/hooks/useApiClient';
import { useShoppingCart } from '@client/providers/ShoppingCartProvider';
import { callApi } from '@client/utils/apiUtils';
import { getOrderPath } from '@client/utils/orderUtils';
import { OrderStatus } from '@heirloom/common/constants';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const POLL_INTERVAL_MS = 1000;
const POLL_MAX_ATTEMPTS = 10;

export const useOrderStatusPoll = () => {
	const apiClient = useApiClient();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth0();
	const { clearCart } = useShoppingCart();
	const pollIntervalRef = useRef<ReturnType<
		typeof setInterval
	> | null>(null);

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
			onTimeout?: () => void;
		} = {},
	) => {
		const { onSuccess, onTimeout } = callbacks;
		let attempts = 0;
		pollIntervalRef.current = setInterval(async () => {
			attempts++;
			const result = await callApi(
				apiClient.orders.getStatus({ params: { shortId } }),
			);
			if (
				result.error === null &&
				result.data.orderStatus === OrderStatus.CONFIRMED
			) {
				stopPolling();
				clearCart();
				navigate(
					getOrderPath(shortId, accessKey, isAuthenticated),
				);
				onSuccess?.();
			} else if (attempts >= POLL_MAX_ATTEMPTS) {
				stopPolling();
				onTimeout?.();
			}
		}, POLL_INTERVAL_MS);
	};

	return { pollUntilPaid };
};
