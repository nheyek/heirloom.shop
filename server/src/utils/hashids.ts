import Hashids from 'hashids';

const BASE_SALT = 'heirloom';
const SHORT_ID_MIN_LENGTH = 5;
const SHORT_ID_ALPHABET = 'ABCDEFGHJKL23456789';

export const ShortIdEntityType = {
	Shop: 'shop',
	Listing: 'listing',
	Order: 'order',
} as const;

export type ShortIdEntityTypeValue =
	(typeof ShortIdEntityType)[keyof typeof ShortIdEntityType];

const hashidsByEntityType: Record<ShortIdEntityTypeValue, Hashids> = {
	[ShortIdEntityType.Shop]: new Hashids(
		`${BASE_SALT}-${ShortIdEntityType.Shop}`,
		SHORT_ID_MIN_LENGTH,
		SHORT_ID_ALPHABET,
	),
	[ShortIdEntityType.Listing]: new Hashids(
		`${BASE_SALT}-${ShortIdEntityType.Listing}`,
		SHORT_ID_MIN_LENGTH,
		SHORT_ID_ALPHABET,
	),
	[ShortIdEntityType.Order]: new Hashids(
		`${BASE_SALT}-${ShortIdEntityType.Order}`,
		SHORT_ID_MIN_LENGTH,
		SHORT_ID_ALPHABET,
	),
};

export const encodeShortId = (
	id: number,
	entityType: ShortIdEntityTypeValue,
): string => hashidsByEntityType[entityType].encode(id);
