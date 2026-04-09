import { searchContract } from '@common/contract';
import { SEARCH_QUERY_LIMITS } from '@common/constants';
import { initServer } from '@ts-rest/express';
import * as searchService from '@server/services/search.service';
import { sanitizeInputString } from '@server/utils/sanitize';
import { validateStringLength } from '@server/utils/validation';

const s = initServer();

export const searchRouter = s.router(searchContract, {
	search: async ({ query: { q } }) => {
		if (typeof q !== 'string') {
			return {
				status: 400 as const,
				body: { error: 'Query parameter "q" is required' },
			};
		}

		const sanitized = sanitizeInputString(q);
		const lengthCheck = validateStringLength(
			sanitized,
			SEARCH_QUERY_LIMITS.minChars,
			SEARCH_QUERY_LIMITS.maxChars,
			'Query',
		);
		if (!lengthCheck.valid) {
			return {
				status: 400 as const,
				body: { error: lengthCheck.message! },
			};
		}

		const results = await searchService.search(sanitized);
		return { status: 200 as const, body: results };
	},
});
