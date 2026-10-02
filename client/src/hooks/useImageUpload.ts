import { toastError } from '@client/toaster';
import {
	IMAGE_JPEG_QUALITY,
	IMAGE_LISTING_MAX_BYTES,
	IMAGE_LISTING_MIN_WIDTH,
	IMAGE_MAX_WIDTH,
	IMAGE_SMALL_WIDTH,
	ImageUploadKind,
	ImageVariant,
	LISTING_LIMITS,
} from '@heirloom/common/constants';
import { useCallback, useRef, useState } from 'react';

const IMAGE_BACKGROUND_COLOR = '#ffffff';

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

type CropRect = { sx: number; sy: number; sw: number; sh: number };

// Images taller than they are wide are center-cropped to the middle square
// section, so every stored image ends up with an aspect ratio >= 1 (as wide
// or wider than it is tall). Landscape/square sources pass through as-is.
const getSquareCropRect = (img: HTMLImageElement): CropRect => {
	const { naturalWidth: w, naturalHeight: h } = img;
	if (h <= w) return { sx: 0, sy: 0, sw: w, sh: h };
	return { sx: 0, sy: Math.round((h - w) / 2), sw: w, sh: w };
};

// Draws the cropped region of `img` onto a canvas, downscaled to
// `targetWidth` (never upscaled), and encodes it as a JPEG File.
const encodeJpegVariant = (
	img: HTMLImageElement,
	crop: CropRect,
	targetWidth: number,
	quality: number,
	fileName: string,
): Promise<File> =>
	new Promise((resolve, reject) => {
		const scale = Math.min(1, targetWidth / crop.sw);
		const width = Math.round(crop.sw * scale);
		const height = Math.round(crop.sh * scale);

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		if (!ctx)
			return reject(new Error('Could not get canvas context'));
		ctx.fillStyle = IMAGE_BACKGROUND_COLOR;
		ctx.fillRect(0, 0, width, height);
		ctx.drawImage(
			img,
			crop.sx,
			crop.sy,
			crop.sw,
			crop.sh,
			0,
			0,
			width,
			height,
		);
		canvas.toBlob(
			(blob) => {
				if (!blob)
					return reject(new Error('Canvas toBlob failed'));
				resolve(
					new File([blob], fileName, {
						type: 'image/jpeg',
					}),
				);
			},
			'image/jpeg',
			quality,
		);
	});

// Listing full images additionally have a 1MB size budget: if the initial
// encode at IMAGE_MAX_WIDTH/IMAGE_JPEG_QUALITY comes in over budget, the
// width is recalculated (bytes scale roughly with width^2 at fixed quality)
// and re-encoded, repeating a few times as the estimate is refined — but
// never stepping below IMAGE_LISTING_MIN_WIDTH, even if still oversized.
const pickListingFullVariant = async (
	img: HTMLImageElement,
	crop: CropRect,
	fileName: string,
): Promise<{ file: File; width: number }> => {
	let width = Math.min(crop.sw, IMAGE_MAX_WIDTH);
	let file = await encodeJpegVariant(
		img,
		crop,
		width,
		IMAGE_JPEG_QUALITY,
		fileName,
	);

	for (
		let attempt = 0;
		attempt < 3 &&
		file.size > IMAGE_LISTING_MAX_BYTES &&
		width > IMAGE_LISTING_MIN_WIDTH;
		attempt++
	) {
		const scale = Math.sqrt(IMAGE_LISTING_MAX_BYTES / file.size);
		const nextWidth = Math.max(
			IMAGE_LISTING_MIN_WIDTH,
			Math.min(width - 1, Math.floor(width * scale)),
		);
		if (nextWidth >= width) break;
		width = nextWidth;
		file = await encodeJpegVariant(
			img,
			crop,
			width,
			IMAGE_JPEG_QUALITY,
			fileName,
		);
	}

	return { file, width };
};

// Produces the full/small JPEG copies of an uploaded image, resized
// entirely client-side. `kind` determines which sizing rules apply: shop
// images are always the full (capped) width at a fixed quality, while
// listing images additionally respect a max file size, stepping the width
// down (never below a floor) until they fit. The small variant is derived
// from whatever width the full variant ended up at, never upscaled.
const createImageVariants = async (
	file: File,
	kind: ImageUploadKind,
): Promise<Record<ImageVariant, File>> => {
	const img = await loadImageElement(file);
	const fileName = `${file.name.replace(/\.[^.]+$/, '')}.jpg`;
	const crop = getSquareCropRect(img);

	let fullFile: File;
	let fullWidth: number;

	if (kind === ImageUploadKind.LISTING) {
		({ file: fullFile, width: fullWidth } =
			await pickListingFullVariant(img, crop, fileName));
	} else {
		fullWidth = Math.min(crop.sw, IMAGE_MAX_WIDTH);
		fullFile = await encodeJpegVariant(
			img,
			crop,
			fullWidth,
			IMAGE_JPEG_QUALITY,
			fileName,
		);
	}

	const smallWidth = Math.min(fullWidth, IMAGE_SMALL_WIDTH);
	const smallFile = await encodeJpegVariant(
		img,
		crop,
		smallWidth,
		IMAGE_JPEG_QUALITY,
		fileName,
	);

	return {
		[ImageVariant.FULL]: fullFile,
		[ImageVariant.SMALL]: smallFile,
	};
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
	kind: ImageUploadKind,
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
				variants = await createImageVariants(file, kind);
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

			const result =
				await getUploadUrlRef.current('image/jpeg');

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
		[kind],
	);

	const addFiles = useCallback(
		(files: File[]) => {
			setImageEntries((prev) => {
				const remaining =
					LISTING_LIMITS.maxImages - prev.length;
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
				const newEntries: ImageEntry[] = accepted.map(
					(f) => ({
						previewUrl: URL.createObjectURL(f),
						uuid: null,
						isUploading: true,
						uploadFailed: false,
					}),
				);
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
				variants = await createImageVariants(file, kind);
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

			const result =
				await getUploadUrlRef.current('image/jpeg');
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
		[kind],
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
