import { toastError } from '@client/toaster';
import {
	IMAGE_VARIANT_WIDTHS,
	ImageVariant,
	LISTING_LIMITS,
} from '@heirloom/common/constants';
import { useCallback, useRef, useState } from 'react';

export type ImageEntry = {
	previewUrl: string;
	uuid: string | null;
	isUploading: boolean;
	uploadFailed: boolean;
};

type GetUploadUrl = (contentType: string) => Promise<{
	uuid: string;
	uploadUrls: Record<ImageVariant, string>;
} | null>;

const JPEG_QUALITY = 0.85;

const loadImageElement = (file: File): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);
		img.onload = () => {
			URL.revokeObjectURL(objectUrl);
			resolve(img);
		};
		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error('Failed to decode image'));
		};
		img.src = objectUrl;
	});

// Draws `img` onto a canvas, downscaled to `targetWidth` (never upscaled),
// and encodes it as a JPEG File.
const encodeJpegVariant = (
	img: HTMLImageElement,
	targetWidth: number,
	fileName: string,
): Promise<File> =>
	new Promise((resolve, reject) => {
		const scale = Math.min(1, targetWidth / img.naturalWidth);
		const width = Math.round(img.naturalWidth * scale);
		const height = Math.round(img.naturalHeight * scale);

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		if (!ctx)
			return reject(new Error('Could not get canvas context'));
		ctx.drawImage(img, 0, 0, width, height);
		canvas.toBlob(
			(blob) => {
				if (!blob)
					return reject(new Error('Canvas toBlob failed'));
				resolve(new File([blob], fileName, { type: 'image/jpeg' }));
			},
			'image/jpeg',
			JPEG_QUALITY,
		);
	});

// Produces the full/small JPEG copies of an uploaded image, resized
// entirely client-side so we never upload more bytes than a given view needs.
const createImageVariants = async (
	file: File,
): Promise<Record<ImageVariant, File>> => {
	const img = await loadImageElement(file);
	const baseName = file.name.replace(/\.[^.]+$/, '');

	const entries = await Promise.all(
		Object.values(ImageVariant).map(async (variant) => {
			const encoded = await encodeJpegVariant(
				img,
				IMAGE_VARIANT_WIDTHS[variant],
				`${baseName}.jpg`,
			);
			return [variant, encoded] as const;
		}),
	);

	return Object.fromEntries(entries) as Record<ImageVariant, File>;
};

const uploadVariants = async (
	variants: Record<ImageVariant, File>,
	uploadUrls: Record<ImageVariant, string>,
): Promise<boolean> => {
	const results = await Promise.all(
		Object.values(ImageVariant).map((variant) =>
			fetch(uploadUrls[variant], {
				method: 'PUT',
				body: variants[variant],
				headers: { 'Content-Type': 'image/jpeg' },
			}),
		),
	);
	return results.every((res) => res.ok);
};

const hashFile = async (file: File): Promise<string> => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
};

export const useImageUpload = (
	getUploadUrl: GetUploadUrl,
	initialEntries: ImageEntry[] = [],
) => {
	const [imageEntries, setImageEntries] =
		useState<ImageEntry[]>(initialEntries);
	const uploadCache = useRef<Map<string, string>>(new Map());

	// Keep a stable ref to the latest getUploadUrl so async closures
	// don't capture a stale version
	const getUploadUrlRef = useRef(getUploadUrl);
	getUploadUrlRef.current = getUploadUrl;

	const uploadFile = useCallback(
		async (file: File, index: number) => {
			let variants: Record<ImageVariant, File>;
			try {
				variants = await createImageVariants(file);
			} catch {
				toastError(
					'Could not process image. Please try a different file.',
				);
				setImageEntries((prev) =>
					prev.map((e, i) =>
						i === index
							? {
									...e,
									isUploading: false,
									uploadFailed: true,
								}
							: e,
					),
				);
				return;
			}

			const fullVariant = variants[ImageVariant.FULL];
			const previewUrl = URL.createObjectURL(fullVariant);
			setImageEntries((prev) =>
				prev.map((e, i) =>
					i === index ? { ...e, previewUrl } : e,
				),
			);

			const hash = await hashFile(fullVariant);

			if (uploadCache.current.has(hash)) {
				const uuid = uploadCache.current.get(hash)!;
				setImageEntries((prev) =>
					prev.map((e, i) =>
						i === index
							? { ...e, uuid, isUploading: false }
							: e,
					),
				);
				return;
			}

			const result = await getUploadUrlRef.current('image/jpeg');

			if (result === null) {
				toastError('Failed to prepare image upload.');
				setImageEntries((prev) =>
					prev.map((e, i) =>
						i === index
							? {
									...e,
									isUploading: false,
									uploadFailed: true,
								}
							: e,
					),
				);
				return;
			}

			const { uuid, uploadUrls } = result;
			const ok = await uploadVariants(variants, uploadUrls);

			if (!ok) {
				toastError('Failed to upload image.');
				setImageEntries((prev) =>
					prev.map((e, i) =>
						i === index
							? {
									...e,
									isUploading: false,
									uploadFailed: true,
								}
							: e,
					),
				);
				return;
			}

			uploadCache.current.set(hash, uuid);
			setImageEntries((prev) =>
				prev.map((e, i) =>
					i === index
						? { ...e, uuid, isUploading: false }
						: e,
				),
			);
		},
		[],
	);

	const addFiles = useCallback(
		(files: File[]) => {
			setImageEntries((prev) => {
				const remaining = LISTING_LIMITS.maxImages - prev.length;
				if (remaining <= 0) {
					toastError(
						`You can only add up to ${LISTING_LIMITS.maxImages} images.`,
					);
					return prev;
				}
				const accepted = files.slice(0, remaining);
				if (accepted.length < files.length) {
					toastError(
						`You can only add up to ${LISTING_LIMITS.maxImages} images.`,
					);
				}
				const startIndex = prev.length;
				const newEntries: ImageEntry[] = accepted.map((f) => ({
					previewUrl: URL.createObjectURL(f),
					uuid: null,
					isUploading: true,
					uploadFailed: false,
				}));
				accepted.forEach((file, i) =>
					uploadFile(file, startIndex + i),
				);
				return [...prev, ...newEntries];
			});
		},
		[uploadFile],
	);

	const removeImage = useCallback((index: number) => {
		setImageEntries((prev) => {
			URL.revokeObjectURL(prev[index]?.previewUrl ?? '');
			return prev.filter((_, i) => i !== index);
		});
	}, []);

	const reorderImages = useCallback((newEntries: ImageEntry[]) => {
		setImageEntries(newEntries);
	}, []);

	const uploadImage = useCallback(
		async (file: File): Promise<string | null> => {
			let variants: Record<ImageVariant, File>;
			try {
				variants = await createImageVariants(file);
			} catch {
				toastError(
					'Could not process image. Please try a different file.',
				);
				return null;
			}

			const hash = await hashFile(variants[ImageVariant.FULL]);

			if (uploadCache.current.has(hash)) {
				return uploadCache.current.get(hash)!;
			}

			const result = await getUploadUrlRef.current('image/jpeg');
			if (result === null) {
				toastError('Failed to prepare image upload.');
				return null;
			}

			const { uuid, uploadUrls } = result;
			const ok = await uploadVariants(variants, uploadUrls);

			if (!ok) {
				toastError('Failed to upload image.');
				return null;
			}

			uploadCache.current.set(hash, uuid);
			return uuid;
		},
		[],
	);

	const isUploading = imageEntries.some((e) => e.isUploading);
	const uuids = imageEntries
		.filter((e) => e.uuid !== null)
		.map((e) => e.uuid!);

	return {
		imageEntries,
		addFiles,
		removeImage,
		reorderImages,
		uploadImage,
		isUploading,
		uuids,
	};
};
