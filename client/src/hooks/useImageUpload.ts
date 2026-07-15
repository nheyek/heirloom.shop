import { toastError } from '@client/toaster';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import { useCallback, useRef, useState } from 'react';

export type ImageEntry = {
	previewUrl: string;
	uuid: string | null;
	isUploading: boolean;
	uploadFailed: boolean;
};

type GetUploadUrl = (
	contentType: string,
) => Promise<{ uuid: string; uploadUrl: string } | null>;

const convertToJpeg = (file: File): Promise<File> =>
	new Promise((resolve, reject) => {
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);
		img.onload = () => {
			URL.revokeObjectURL(objectUrl);
			const canvas = document.createElement('canvas');
			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;
			const ctx = canvas.getContext('2d');
			if (!ctx)
				return reject(
					new Error('Could not get canvas context'),
				);
			ctx.drawImage(img, 0, 0);
			canvas.toBlob(
				(blob) => {
					if (!blob)
						return reject(
							new Error('Canvas toBlob failed'),
						);
					resolve(
						new File(
							[blob],
							file.name.replace(/\.[^.]+$/, '.jpg'),
							{ type: 'image/jpeg' },
						),
					);
				},
				'image/jpeg',
				0.85,
			);
		};
		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error('Failed to decode image'));
		};
		img.src = objectUrl;
	});

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
			let converted: File;
			try {
				converted = await convertToJpeg(file);
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

			const previewUrl = URL.createObjectURL(converted);
			setImageEntries((prev) =>
				prev.map((e, i) =>
					i === index ? { ...e, previewUrl } : e,
				),
			);

			const hash = await hashFile(converted);

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

			const { uuid, uploadUrl } = result;
			const uploadRes = await fetch(uploadUrl, {
				method: 'PUT',
				body: converted,
				headers: { 'Content-Type': 'image/jpeg' },
			});

			if (!uploadRes.ok) {
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
			let converted: File;
			try {
				converted = await convertToJpeg(file);
			} catch {
				toastError(
					'Could not process image. Please try a different file.',
				);
				return null;
			}

			const hash = await hashFile(converted);

			if (uploadCache.current.has(hash)) {
				return uploadCache.current.get(hash)!;
			}

			const result =
				await getUploadUrlRef.current('image/jpeg');
			if (result === null) {
				toastError('Failed to prepare image upload.');
				return null;
			}

			const { uuid, uploadUrl } = result;
			const uploadRes = await fetch(uploadUrl, {
				method: 'PUT',
				body: converted,
				headers: { 'Content-Type': 'image/jpeg' },
			});

			if (!uploadRes.ok) {
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
