import { CheckoutData } from '@common/types/CheckoutData';
import { Request, Response } from 'express';

export const calculateTax = async (
	request: Request<CheckoutData>,
	response: Response,
) => {};
