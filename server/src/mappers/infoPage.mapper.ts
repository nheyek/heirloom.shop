import { InfoPageKey } from '@heirloom/common/constants';
import { InfoPageData } from '@heirloom/common/contract';
import { InfoPage } from '@server/entities/generated/InfoPage';

export const mapInfoPageToApiResponseData = (
	infoPage: InfoPage,
): InfoPageData => ({
	key: infoPage.key as InfoPageKey,
	contentHtml: infoPage.contentHtml,
});
