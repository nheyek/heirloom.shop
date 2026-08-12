import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
	ImageVariant,
	imageVariantSuffix,
} from '@heirloom/common/constants';
import { randomUUID } from 'crypto';

const s3 = new S3Client({
	endpoint: process.env.DO_SPACES_ENDPOINT,
	region: process.env.DO_SPACES_REGION ?? 'nyc3',
	credentials: {
		accessKeyId: process.env.DO_SPACES_KEY!,
		secretAccessKey: process.env.DO_SPACES_SECRET!,
	},
	forcePathStyle: false,
});

const CONTENT_TYPE_TO_EXT: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/gif': 'gif',
	'image/avif': 'avif',
};

export class InvalidContentTypeError extends Error {
	constructor(contentType: string) {
		super(`Unsupported image content type: ${contentType}`);
		this.name = 'InvalidContentTypeError';
	}
}

const assertValidImageContentType = (contentType: string): string => {
	const ext = CONTENT_TYPE_TO_EXT[contentType];
	if (!ext) {
		throw new InvalidContentTypeError(contentType);
	}
	return ext;
};

const presignPut = async (
	key: string,
	contentType: string,
): Promise<string> => {
	const command = new PutObjectCommand({
		Bucket: process.env.DO_SPACES_BUCKET!,
		Key: key,
		ContentType: contentType,
		ACL: 'public-read',
	});
	return getSignedUrl(s3, command, { expiresIn: 300 });
};

const generateVariantUploadUrls = async (
	directory: string,
	contentType: string,
): Promise<{ uuid: string; uploadUrls: Record<ImageVariant, string> }> => {
	const ext = assertValidImageContentType(contentType);
	const uuid = randomUUID();

	const entries = await Promise.all(
		Object.values(ImageVariant).map(async (variant) => {
			const key = `${directory}/${uuid}${imageVariantSuffix(variant)}.${ext}`;
			return [variant, await presignPut(key, contentType)] as const;
		}),
	);

	return {
		uuid,
		uploadUrls: Object.fromEntries(entries) as Record<
			ImageVariant,
			string
		>,
	};
};

export const generateShopImageUploadUrl = (
	contentType: string,
): Promise<{ uuid: string; uploadUrls: Record<ImageVariant, string> }> =>
	generateVariantUploadUrls('shop-profile-images', contentType);

export const generateListingImageUploadUrl = (
	shopShortId: string,
	contentType: string,
): Promise<{ uuid: string; uploadUrls: Record<ImageVariant, string> }> =>
	generateVariantUploadUrls(`listing-images/${shopShortId}`, contentType);
