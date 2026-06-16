import { toastError } from '@client/toaster';
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

const hashFile = async (file: File): Promise<string> => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
};

export const useImageUpload = (getUploadUrl: GetUploadUrl) => {
	const [imageEntries, setImageEntries] = useState<ImageEntry[]>([]);
	const uploadCache = useRef<Map<string, string>>(new Map());

	// Keep a stable ref to the latest getUploadUrl so async closures
	// don't capture a stale version
	const getUploadUrlRef = useRef(getUploadUrl);
	getUploadUrlRef.current = getUploadUrl;

	const uploadFile = useCallback(async (file: File, index: number) => {
		const hash = await hashFile(file);

		if (uploadCache.current.has(hash)) {
			const uuid = uploadCache.current.get(hash)!;
			setImageEntries((prev) =>
				prev.map((e, i) =>
					i === index ? { ...e, uuid, isUploading: false } : e,
				),
			);
			return;
		}

		const result = await getUploadUrlRef.current(file.type);

		if (result === null) {
			toastError('Failed to prepare image upload.');
			setImageEntries((prev) =>
				prev.map((e, i) =>
					i === index
						? { ...e, isUploading: false, uploadFailed: true }
						: e,
				),
			);
			return;
		}

		const { uuid, uploadUrl } = result;
		const uploadRes = await fetch(uploadUrl, {
			method: 'PUT',
			body: file,
			headers: { 'Content-Type': file.type },
		});

		if (!uploadRes.ok) {
			toastError('Failed to upload image.');
			setImageEntries((prev) =>
				prev.map((e, i) =>
					i === index
						? { ...e, isUploading: false, uploadFailed: true }
						: e,
				),
			);
			return;
		}

		uploadCache.current.set(hash, uuid);
		setImageEntries((prev) =>
			prev.map((e, i) =>
				i === index ? { ...e, uuid, isUploading: false } : e,
			),
		);
	}, []);

	const addFiles = useCallback(
		(files: File[]) => {
			setImageEntries((prev) => {
				const startIndex = prev.length;
				const newEntries: ImageEntry[] = files.map((f) => ({
					previewUrl: URL.createObjectURL(f),
					uuid: null,
					isUploading: true,
					uploadFailed: false,
				}));
				files.forEach((file, i) => uploadFile(file, startIndex + i));
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

	const isUploading = imageEntries.some((e) => e.isUploading);
	const uuids = imageEntries
		.filter((e) => e.uuid !== null)
		.map((e) => e.uuid!);

	return { imageEntries, addFiles, removeImage, reorderImages, isUploading, uuids };
};
