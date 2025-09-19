import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { UserInfo } from '@common/types/UserInfo';

export const getCurrentUser = async (req: Request, res: Response) => {
	const userEmail = req.userClaims?.email;

	let currentUser = await userService.findUserByEmail(userEmail);
	if (!currentUser) {
		try {
			currentUser = await userService.createUser(userEmail);
		} catch {
			return res.status(500).json({ message: 'Failed to auto-create user record' });
		}
	}

	const shopId = await userService.getShopIdForUser(currentUser.id);

	const userInfo: UserInfo = {
		id: currentUser.id,
		email: currentUser.email,
		shopId,
	};

	return res.json(userInfo);
};
