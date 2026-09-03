import { getEm } from '@server/db';
import { InfoPage } from '@server/entities/generated/InfoPage';

export const findAllInfoPages = async (): Promise<InfoPage[]> => {
	const em = getEm();
	return em.find(InfoPage, {});
};
