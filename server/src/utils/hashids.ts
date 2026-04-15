import Hashids from 'hashids';

const SALT = 'heirloom';
const SHORT_ID_MIN_LENGTH = 5;

const SHORT_ID_ALPHABET = 'ABCDEFGHJKL23456789';

const shortHashIds = new Hashids(
	SALT,
	SHORT_ID_MIN_LENGTH,
	SHORT_ID_ALPHABET,
);

export const encodeShortId = (id: number): string =>
	shortHashIds.encode(id);
