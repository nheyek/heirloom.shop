import { ShopCardData } from '@heirloom/common/contract';

export const indexShopTitles = (
	shops: ShopCardData[] | undefined,
): Map<string, string> =>
	new Map((shops ?? []).map((shop) => [shop.shortId, shop.title]));
