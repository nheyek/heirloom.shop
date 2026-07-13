import { Button } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listingForm/ListingFormLayout';
import { ListingFormSkeleton } from '@client/components/listingForm/ListingFormSkeleton';
import { useListingForm } from '@client/components/listingForm/useListingForm';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { useUnsavedChangesGuard } from '@client/hooks/useUnsavedChangesGuard';
import { useShopManager } from '@client/providers/ShopManagerProvider';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { useRef, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const ShopManagerListingCreatePage = () => {
	const { shortId: shopShortId } = useParams<{ shortId: string }>();
	const {
		processingProfiles,
		shippingProfiles,
		returnProfiles,
		personalizationProfiles,
		profilesLoading,
	} = useShopManager();
	const apiClient = useApiClient();
	const navigate = useNavigate();
	const form = useListingForm({
		shopShortId: shopShortId!,
		initialProcessingProfiles: processingProfiles,
		initialShippingProfiles: shippingProfiles,
		initialReturnProfiles: returnProfiles,
		initialPersonalizationProfiles: personalizationProfiles,
	});
	const containerRef = useRef<HTMLDivElement>(null);
	const [savePending, setSavePending] = useState(false);

	useUnsavedChangesGuard(form.isDirty);

	if (profilesLoading) {
		return <ListingFormSkeleton />;
	}

	const listingsPath = `/${CLIENT_ROUTES.shop}/${shopShortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}`;

	const handleCreate = async () => {
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
					personalizationProfileId:
						form.personalizationProfileId != null
							? Number(form.personalizationProfileId)
							: null,
					fullDescr:
						form.descrSections.length > 0
							? form.descrSections
							: null,
					variations: form.variations,
					combinations: form.combinations,
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

	const isBusy = form.isUploadingImages || savePending;

	return (
		<ListingFormLayout
			form={form}
			containerRef={containerRef}
			disabled={savePending}
			actions={
				<Button
					size="lg"
					width={150}
					fontSize={22}
					onClick={handleCreate}
					loading={isBusy}
				>
					<FaCheckCircle />
					Publish
				</Button>
			}
		/>
	);
};
