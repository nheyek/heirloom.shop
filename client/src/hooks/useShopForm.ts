import { CountryCode } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ShopCardData } from '@heirloom/common/contract';
import { useRef, useState } from 'react';

const hashFile = async (file: File): Promise<string> => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
};

type UseShopFormOptions = {
	initialData?: ShopCardData;
};

export const useShopForm = ({
	initialData,
}: UseShopFormOptions = {}) => {
	const apiClient = useApiClient();

	const [title, setTitle] = useState(initialData?.title ?? '');
	const [classification, setClassification] = useState(
		initialData?.classification ?? '',
	);
	const [country, setCountry] = useState<CountryCode>(
		(initialData?.countryCode as CountryCode) ?? CountryCode.US,
	);
	const [location, setLocation] = useState(
		initialData?.location ?? '',
	);

	const [imagePreviewUrl, setImagePreviewUrl] = useState<
		string | null
	>(
		initialData?.profileImageUuid
			? `${process.env.SHOP_PROFILE_IMAGES_URL}/${initialData.profileImageUuid}.jpg`
			: null,
	);
	const existingImageUuidRef = useRef<string | null>(
		initialData?.profileImageUuid ?? null,
	);

	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const uploadCache = useRef<Map<string, string>>(new Map());
	const selectedHashRef = useRef<string | null>(null);

	const [titleError, setTitleError] = useState<string | null>(null);
	const [classificationError, setClassificationError] = useState<
		string | null
	>(null);
	const [locationError, setLocationError] = useState<string | null>(
		null,
	);

	const handleImageSelect = async (file: File) => {
		setImagePreviewUrl(URL.createObjectURL(file));

		const hash = await hashFile(file);
		selectedHashRef.current = hash;

		if (uploadCache.current.has(hash)) return;

		setIsUploadingImage(true);
		const result = await callApi(
			apiClient.admin.getShopImageUploadUrl({
				body: { contentType: file.type },
			}),
		);
		if (result.error !== null) {
			toastError('Failed to prepare image upload.');
			setIsUploadingImage(false);
			return;
		}

		const { uuid, uploadUrl } = result.data;
		const uploadRes = await fetch(uploadUrl, {
			method: 'PUT',
			body: file,
			headers: { 'Content-Type': file.type },
		});

		setIsUploadingImage(false);

		if (!uploadRes.ok) {
			toastError('Failed to upload image.');
			return;
		}

		uploadCache.current.set(hash, uuid);
	};

	const resolveImageUuid = (): string | undefined => {
		if (selectedHashRef.current) {
			return uploadCache.current.get(selectedHashRef.current);
		}
		return existingImageUuidRef.current ?? undefined;
	};

	const validateSharedFields = (): boolean => {
		let valid = true;

		if (!title.trim()) {
			setTitleError('Title is required.');
			valid = false;
		} else setTitleError(null);

		if (!classification.trim()) {
			setClassificationError('Classification is required.');
			valid = false;
		} else setClassificationError(null);

		if (!location.trim()) {
			setLocationError('Location is required.');
			valid = false;
		} else setLocationError(null);

		return valid;
	};

	return {
		title,
		setTitle,
		classification,
		setClassification,
		country,
		setCountry,
		location,
		setLocation,
		imagePreviewUrl,
		isUploadingImage,
		handleImageSelect,
		resolveImageUuid,
		titleError,
		setTitleError,
		classificationError,
		locationError,
		validateSharedFields,
	};
};
