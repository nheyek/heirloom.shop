import { CLIENT_ROUTES } from '@client/constants';

export const getCategoryPath = (categoryId: string) =>
	`/${CLIENT_ROUTES.category}/${categoryId.toLowerCase()}`;
