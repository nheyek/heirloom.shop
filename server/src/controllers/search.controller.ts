import { Request, Response } from 'express';
import * as searchService from '../services/search.service';

export const search = async (req: Request, res: Response) => {
	const query = req.query.q;
	if (typeof query !== 'string' || query.trim().length === 0) {
		res.status(400).json({ message: 'Query parameter "q" is required' });
		return;
	}
	const results = await searchService.search(query.trim());
	res.json(results);
};
