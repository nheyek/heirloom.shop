import { categoryContract } from '@common/contract';
import { initClient } from '@ts-rest/core';

export const categoryClient = initClient(categoryContract, {
	baseUrl: '',
	baseHeaders: {},
});
