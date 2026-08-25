import { US_STATE_CODES } from '../constants.js';

export const isValidUsState = (state: string): boolean =>
	US_STATE_CODES.has(state.trim().toUpperCase());
