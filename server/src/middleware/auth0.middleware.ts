import { auth } from 'express-oauth2-jwt-bearer';
import { NextFunction, Request, Response } from 'express';

const authenticate = auth({
	issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
	audience: process.env.AUTH0_CLIENT_ID,
});

export const authAndSetUser = (req: Request, res: Response, next: NextFunction) => {
	authenticate(req, res, (err) => {
		if (err) return next(err);

		if (req.auth?.payload) {
			req.userClaims = req.auth.payload;
		}
		next();
	});
};
