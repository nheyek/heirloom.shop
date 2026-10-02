import { CLIENT_ROUTES } from '@client/constants';

export const getOrderPath = (
	shortId: string,
	accessKey: string,
	isAuthenticated: boolean,
) =>
	isAuthenticated
		? `/${CLIENT_ROUTES.orders}/${shortId}`
		: `/${CLIENT_ROUTES.order}/${shortId}?key=${accessKey}`;
