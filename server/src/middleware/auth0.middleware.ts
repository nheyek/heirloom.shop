import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const authenticate = auth({
	issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
	audience: process.env.AUTH0_AUDIENCE,
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
