import { Button, Skeleton, Stack } from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { ShopFormFields } from '@client/components/shop/ShopFormFields';
import { useApiClient } from '@client/hooks/useApiClient';
import { useShopForm } from '@client/hooks/useShopForm';
import { toastError, toastSuccess } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ShopCardData } from '@heirloom/common/contract';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ShopInfoForm = ({ shopData }: { shopData: ShopCardData }) => {
	const apiClient = useApiClient();
	const [isSaving, setIsSaving] = useState(false);

	const form = useShopForm({ initialData: shopData });

	const handleSave = async () => {
		if (!form.validateSharedFields()) return;

		setIsSaving(true);
		const result = await callApi(
			apiClient.shops.updateById({
				params: { id: shopData.shortId },
				body: {
					title: form.title,
					classification: form.classification,
					location: form.location,
					countryCode: form.country,
					profileImageUuid: form.resolveImageUuid() ?? null,
				},
			}),
		);
		setIsSaving(false);

		if (result.status === 409) {
			form.setTitleError(
				'A shop with this name already exists.',
			);
			return;
		}

		if (result.error !== null) {
			toastError('Failed to save changes.');
			return;
		}

		toastSuccess('Changes saved.');
	};

	return (
		<Stack
			gap={5}
			maxWidth={500}
		>
			<ShopFormFields
				title={form.title}
				onTitleChange={form.setTitle}
				titleError={form.titleError}
				classification={form.classification}
				onClassificationChange={form.setClassification}
				classificationError={form.classificationError}
				country={form.country}
				onCountryChange={form.setCountry}
				location={form.location}
				onLocationChange={form.setLocation}
				locationError={form.locationError}
				imagePreviewUrl={form.imagePreviewUrl}
				isUploadingImage={form.isUploadingImage}
				onImageSelect={form.handleImageSelect}
				disabled={isSaving}
			/>
			<Button
				size="lg"
				width={175}
				fontSize={20}
				onClick={handleSave}
				disabled={isSaving || form.isUploadingImage}
				loading={isSaving || form.isUploadingImage}
			>
				<FaCheckCircle />
				Save Changes
			</Button>
		</Stack>
	);
};

export const ShopManagerInfoPage = () => {
	const { shortId } = useParams<{ shortId: string }>();
	const apiClient = useApiClient();

	const [shopData, setShopData] = useState<ShopCardData | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState(false);

	useEffect(() => {
		if (!shortId) return;
		callApi(
			apiClient.shops.getById({ params: { id: shortId } }),
		).then((result) => {
			if (result.error !== null) {
				setLoadError(true);
			} else {
				setShopData(result.data);
			}
			setIsLoading(false);
		});
	}, [shortId]);

	if (isLoading) {
		return (
			<Stack gap={5}>
				<Skeleton
					height={15}
					borderRadius="md"
				/>
				<Skeleton
					height={15}
					borderRadius="md"
				/>
				<Skeleton
					height={15}
					borderRadius="md"
				/>
				<Skeleton
					height={30}
					borderRadius="md"
				/>
			</Stack>
		);
	}

	if (loadError || !shopData) {
		return <AppError title="Failed to load shop info" />;
	}

	return <ShopInfoForm shopData={shopData} />;
};
