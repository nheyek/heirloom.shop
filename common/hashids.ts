import Hashids from 'hashids';

const SALT = 'heirloom';
const MIN_LENGTH = 4;

const hashids = new Hashids(SALT, MIN_LENGTH);

export function encodeId(id: number): string {
	return hashids.encode(id);
}

export function decodeId(shortId: string): number | null {
	const decoded = hashids.decode(shortId);
	if (decoded.length === 0) {
		return null;
	}
	return Number(decoded[0]);
}
