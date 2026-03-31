import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

export const TEST_USER_EMAIL = 'test@heirloom.shop';

const authenticate =
	process.env.NODE_ENV !== 'testing'
		? auth({
				issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
				audience: process.env.AUTH0_AUDIENCE,
			})
		: null;

export const authAndSetUser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (process.env.NODE_ENV === 'testing') {
		if (!req.headers.authorization) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		req.userClaims = { email: TEST_USER_EMAIL };
		return next();
	}

	authenticate!(req, res, (err) => {
		if (err) return next(err);

		if (req.auth?.payload) {
			req.userClaims = req.auth.payload;
		}
		next();
	});
};
