import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError, auth } from 'express-oauth2-jwt-bearer';
import { findUserByEmail } from '@server/services/user.service';

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
			return res.status(401).end();
		}
		req.userClaims = { email: TEST_USER_EMAIL };
		return next();
	}

	authenticate!(req, res, (err) => {
		// express-oauth2-jwt-bearer raises UnauthorizedError for expired/invalid
		// tokens — that's a normal occurrence, not an application error.
		if (err instanceof UnauthorizedError) return res.status(401).end();
		if (err) return next(err);

		if (req.auth?.payload) {
			req.userClaims = req.auth.payload;
		}
		next();
	});
};

export const adminAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	authAndSetUser(req, res, async (err?: unknown) => {
		if (err) return next(err);
		if (!req.userClaims?.email) return res.status(401).end();

		const user = await findUserByEmail(req.userClaims.email);
		if (!user?.isAdmin) return res.status(403).json({ error: 'Forbidden' });

		next();
	});
};

export const optionalAuthAndSetUser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (process.env.NODE_ENV === 'testing') {
		if (req.headers.authorization) {
			req.userClaims = { email: TEST_USER_EMAIL };
		}
		return next();
	}

	if (!req.headers.authorization) {
		return next();
	}

	authenticate!(req, res, (err) => {
		if (err instanceof UnauthorizedError) return res.status(401).end();
		if (err) return next(err);

		if (req.auth?.payload) {
			req.userClaims = req.auth.payload;
		}
		next();
	});
};
