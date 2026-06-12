import { Button, Field, Skeleton, Stack } from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { RichTextEditor } from '@client/components/richText/RichTextEditor';
import { ShopFormFields } from '@client/components/shop/ShopFormFields';
import { useApiClient } from '@client/hooks/useApiClient';
import { useShopForm } from '@client/hooks/useShopForm';
import { toastError, toastSuccess } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { ShopCardData } from '@heirloom/common/contract';
import { useCallback, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ShopInfoForm = ({ shopData }: { shopData: ShopCardData }) => {
	const apiClient = useApiClient();
	const [isSaving, setIsSaving] = useState(false);
	const [richText, setRichText] = useState(
		shopData.profileRichText ?? '',
	);

	const form = useShopForm({ initialData: shopData });

	const handleRichTextChange = useCallback((html: string) => {
		setRichText(html);
	}, []);

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
					profileRichText: richText || null,
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
		<>
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
				gap={5}
				disabled={isSaving}
			/>
			<Field.Root>
				<Field.Label
					fontSize={18}
					fontWeight={500}
				>
					About
				</Field.Label>
				<RichTextEditor
					initialHtml={shopData.profileRichText}
					onChange={handleRichTextChange}
					maxHeight={500}
				/>
			</Field.Root>
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
		</>
	);
};

const PageSkeleton = () => (
	<>
		<Skeleton
			height={50}
			borderRadius="md"
		/>
		<Skeleton
			height={50}
			borderRadius="md"
		/>
		<Skeleton
			height={50}
			borderRadius="md"
		/>
		<Skeleton
			aspectRatio={5 / 2}
			borderRadius="md"
		/>
		<Skeleton
			height={200}
			borderRadius="md"
		/>
	</>
);

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

	return (
		<Stack
			gap={5}
			maxW={650}
		>
			{isLoading && <PageSkeleton />}
			{!isLoading && loadError && (
				<AppError title="Failed to load shop info" />
			)}
			{!isLoading && shopData && (
				<ShopInfoForm shopData={shopData} />
			)}
		</Stack>
	);
};
