import { Button, HStack } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listingForm/ListingFormLayout';
import { ListingFormSkeleton } from '@client/components/listingForm/ListingFormSkeleton';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useListingForm } from '@client/hooks/useListingForm';
import { useShopManager } from '@client/providers/ShopManagerProvider';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { useRef, useState } from 'react';
import { FaCheckCircle, FaSave } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const ShopManagerListingCreatePage = () => {
	const { shortId: shopShortId } = useParams<{ shortId: string }>();
	const {
		processingProfiles,
		shippingProfiles,
		returnProfiles,
		profilesLoading,
	} = useShopManager();
	const apiClient = useApiClient();
	const navigate = useNavigate();
	const form = useListingForm({
		shopShortId: shopShortId!,
		initialProcessingProfiles: processingProfiles,
		initialShippingProfiles: shippingProfiles,
		initialReturnProfiles: returnProfiles,
	});
	const containerRef = useRef<HTMLDivElement>(null);
	const [savePending, setSavePending] = useState(false);

	if (profilesLoading) {
		return <ListingFormSkeleton />;
	}

	const listingsPath = `/${CLIENT_ROUTES.shop}/${shopShortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}`;

	const handleCreate = async (available: boolean) => {
		if (!form.validate()) {
			requestAnimationFrame(() => {
				containerRef.current
					?.querySelector('[data-invalid]')
					?.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
			});
			return;
		}
		setSavePending(true);
		const result = await callApi(
			apiClient.shopManager.createListing({
				params: { shopId: shopShortId! },
				body: {
					title: form.title,
					subtitle: form.subtitle || null,
					categoryId: form.categoryId!,
					priceCents: form.priceCents ?? 0,
					imageUuids: form.uploadedUuids,
					processingProfileId:
						form.processingProfileId != null
							? Number(form.processingProfileId)
							: null,
					shippingProfileId:
						form.shippingProfileId != null
							? Number(form.shippingProfileId)
							: null,
					returnProfileId:
						form.returnProfileId != null
							? Number(form.returnProfileId)
							: null,
					fullDescr:
						form.descrSections.length > 0
							? form.descrSections
							: null,
					variations: form.variations,
					combinations: form.combinations,
					available,
				},
			}),
		);
		setSavePending(false);
		if (result.error !== null) {
			toastError('Failed to create listing. Please try again.');
			return;
		}
		navigate(listingsPath);
	};

	const isBlocked = form.isUploadingImages || savePending;

	return (
		<ListingFormLayout
			form={form}
			containerRef={containerRef}
			disabled={savePending}
			actions={
				<HStack gap={3}>
					<Button
						size="md"
						fontSize={18}
						variant="outline"
						onClick={() => handleCreate(false)}
						disabled={isBlocked}
						loading={isBlocked}
					>
						<FaSave />
						Save Draft
					</Button>
					<Button
						size="md"
						fontSize={18}
						onClick={() => handleCreate(true)}
						disabled={isBlocked}
						loading={isBlocked}
					>
						<FaCheckCircle />
						Publish
					</Button>
				</HStack>
			}
		/>
	);
};
