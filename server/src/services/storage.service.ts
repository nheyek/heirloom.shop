import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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

export const generateShopImageUploadUrl = async (): Promise<{
	uuid: string;
	uploadUrl: string;
}> => {
	const uuid = randomUUID();
	const key = `shop-profile-images/${uuid}.jpg`;

	const command = new PutObjectCommand({
		Bucket: process.env.DO_SPACES_BUCKET!,
		Key: key,
		ContentType: 'image/jpeg',
		ACL: 'public-read',
	});

	const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
	return { uuid, uploadUrl };
};
