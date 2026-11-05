import { Button } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listingForm/ListingFormLayout';
import { ListingFormSkeleton } from '@client/components/listingForm/ListingFormSkeleton';
import {
	PersonalizationProfile,
	ProcessingProfile,
	ReturnProfile,
	ShippingProfile,
	useListingForm,
} from '@client/components/listingForm/useListingForm';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { ImageEntry } from '@client/hooks/useImageUpload';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useUnsavedChangesGuard } from '@client/hooks/useUnsavedChangesGuard';
import { useShopManager } from '@client/providers/ShopManagerProvider';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import { listingImageUrl } from '@client/utils/imageUtils';
import {
	CombinationsData,
	ListingEditData,
	VariationImagesData,
	VariationsData,
} from '@heirloom/common/contract';
import { useEffect, useRef, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

type FormProps = {
	shopShortId: string;
	listingShortId: string;
	listingData: ListingEditData;
	processingProfiles: ProcessingProfile[];
	shippingProfiles: ShippingProfile[];
	returnProfiles: ReturnProfile[];
	personalizationProfiles: PersonalizationProfile[];
};

const ListingEditForm = ({
	shopShortId,
	listingShortId,
	listingData,
	processingProfiles,
	shippingProfiles,
	returnProfiles,
	personalizationProfiles,
}: FormProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const apiClient = useApiClient();
	const navigate = useNavigate();
	const [savePending, setSavePending] = useState(false);

	const initialImageEntries: ImageEntry[] =
		listingData.imageUuids.map((uuid) => ({
			previewUrl: listingImageUrl(shopShortId, uuid),
			uuid,
			isUploading: false,
			uploadFailed: false,
		}));

	const form = useListingForm({
		shopShortId,
		initialTitle: listingData.title,
		initialSubtitle: listingData.subtitle ?? '',
		initialCategoryId: listingData.categoryId,
		initialCountryCode: listingData.countryCode,
		initialPriceCents: listingData.priceCents,
		initialTrackInventory: listingData.trackInventory,
		initialInventory:
			listingData.inventory != null
				? String(listingData.inventory)
				: '',
		initialImageEntries,
		initialProcessingProfileId:
			listingData.processingProfileId != null
				? String(listingData.processingProfileId)
				: null,
		initialShippingProfileId:
			listingData.shippingProfileId != null
				? String(listingData.shippingProfileId)
				: null,
		initialReturnProfileId:
			listingData.returnProfileId != null
				? String(listingData.returnProfileId)
				: null,
		initialPersonalizationProfileId:
			listingData.personalizationProfileId != null
				? String(listingData.personalizationProfileId)
				: null,
		initialProcessingProfiles: processingProfiles,
		initialShippingProfiles: shippingProfiles,
		initialReturnProfiles: returnProfiles,
		initialPersonalizationProfiles: personalizationProfiles,
		initialDescrSections: listingData.fullDescr ?? [],
		initialVariations: listingData.variations as VariationsData,
		initialCombinations:
			listingData.combinations as CombinationsData,
		initialVariationImages:
			listingData.variationImages as VariationImagesData | null,
	});

	useUnsavedChangesGuard(form.isDirty);

	const handleSave = async () => {
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
			apiClient.shopManager.updateListing({
				params: { shopId: shopShortId, listingShortId },
				body: {
					title: form.title,
					subtitle: form.subtitle || null,
					categoryId: form.categoryId!,
					countryCode: form.countryCode,
					priceCents: form.priceCents ?? 0,
					trackInventory: form.trackInventory,
					inventory: form.trackInventory
						? Number(form.inventory)
						: null,
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
					variationImages: form.variationImages,
				},
			}),
		);
		setSavePending(false);
		if (result.error !== null) {
			toastError('Failed to save listing.', result.error);
			return;
		}
		navigate(
			`/${CLIENT_ROUTES.shop}/${shopShortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}`,
		);
	};

	return (
		<ListingFormLayout
			form={form}
			containerRef={containerRef}
			disabled={savePending}
			actions={
				<Button
					size="lg"
					onClick={handleSave}
					disabled={
						!form.isDirty ||
						form.isUploadingImages ||
						savePending
					}
					loading={form.isUploadingImages || savePending}
				>
					<FaCheckCircle />
					Save Changes
				</Button>
			}
		/>
	);
};

export const ShopManagerListingEditPage = () => {
	const { shortId: shopShortId, listingShortId } = useParams<{
		shortId: string;
		listingShortId: string;
	}>();

	const apiClient = useApiClient();
	const {
		processingProfiles,
		shippingProfiles,
		returnProfiles,
		personalizationProfiles,
		profilesLoading,
	} = useShopManager();

	const [listingData, setListingData] =
		useState<ListingEditData | null>(null);
	const [rawListingLoading, setListingLoading] = useState(true);
	const listingLoading = useMinDuration(rawListingLoading);

	useEffect(() => {
		if (!shopShortId || !listingShortId) return;
		setListingLoading(true);
		callApi(
			apiClient.shopManager.getListing({
				params: { shopId: shopShortId, listingShortId },
			}),
		).then((result) => {
			if (result.error === null) setListingData(result.data);
			setListingLoading(false);
		});
	}, [shopShortId, listingShortId]);

	if (listingLoading || profilesLoading || !listingData) {
		return <ListingFormSkeleton />;
	}

	return (
		<ListingEditForm
			shopShortId={shopShortId!}
			listingShortId={listingShortId!}
			listingData={listingData}
			processingProfiles={processingProfiles}
			shippingProfiles={shippingProfiles}
			returnProfiles={returnProfiles}
			personalizationProfiles={personalizationProfiles}
		/>
	);
};
