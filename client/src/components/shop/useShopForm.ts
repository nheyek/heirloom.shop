import { CountryCode } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useImageUpload } from '@client/hooks/useImageUpload';
import { callApi } from '@client/utils/apiUtils';
import { ShopCardData } from '@heirloom/common/contract';
import { ValidationField } from '@heirloom/common/validation/shared';
import { validateShopFields } from '@heirloom/common/validation/shop';
import { useRef, useState } from 'react';

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

	const [titleError, setTitleError] = useState<string | null>(null);
	const [classificationError, setClassificationError] = useState<string | null>(null);
	const [locationError, setLocationError] = useState<string | null>(null);

	// The existing server-side image, shown as the initial preview and
	// used as the fallback uuid if no new image has been uploaded
	const existingImageUuid = useRef<string | null>(
		initialData?.profileImageUuid ?? null,
	);
	const existingPreviewUrl = initialData?.profileImageUuid
		? `${process.env.SHOP_PROFILE_IMAGES_URL}/${initialData.profileImageUuid}.jpg`
		: null;

	const { imageEntries, addFiles, isUploading, uuids } =
		useImageUpload(async (contentType) => {
			const result = await callApi(
				apiClient.admin.getShopImageUploadUrl({
					body: { contentType },
				}),
			);
			return result.error !== null ? null : result.data;
		});

	const imagePreviewUrl =
		imageEntries[0]?.previewUrl ?? existingPreviewUrl;
	const isUploadingImage = isUploading;
	const handleImageSelect = (file: File) => addFiles([file]);
	const resolveImageUuid = (): string | undefined =>
		uuids[0] ?? existingImageUuid.current ?? undefined;

	const validateSharedFields = (): boolean => {
		const errors = validateShopFields({
			title,
			classification,
			location,
		});

		setTitleError(
			errors.find((e) => e.field === ValidationField.Title)
				?.message ?? null,
		);
		setClassificationError(
			errors.find(
				(e) => e.field === ValidationField.Classification,
			)?.message ?? null,
		);
		setLocationError(
			errors.find((e) => e.field === ValidationField.Location)
				?.message ?? null,
		);

		return errors.length === 0;
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
