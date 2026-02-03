import { SEARCH_QUERY_LIMITS } from '@common/constants';
import { Request, Response } from 'express';
import * as searchService from '../services/search.service';
import { sanitizeInputString } from '../utils/sanitize';
import { validateStringLength } from '../utils/validation';

export const search = async (
	req: Request,
	res: Response,
) => {
	const rawQuery = req.query.q;
	if (typeof rawQuery !== 'string') {
		res.status(400).json({
			message: 'Query parameter "q" is required',
		});
		return;
	}

	const query = sanitizeInputString(rawQuery);
	const lengthCheck = validateStringLength(
		query,
		SEARCH_QUERY_LIMITS.minChars,
		SEARCH_QUERY_LIMITS.maxChars,
		'Query',
	);
	if (!lengthCheck.valid) {
		res.status(400).json({
			message: lengthCheck.message,
		});
		return;
	}

	const results = await searchService.search(query);
	res.json(results);
};
