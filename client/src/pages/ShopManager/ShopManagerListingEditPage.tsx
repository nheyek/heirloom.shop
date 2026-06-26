import { Button } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listingForm/ListingFormLayout';
import { ListingFormSkeleton } from '@client/components/listingForm/ListingFormSkeleton';
import { useApiClient } from '@client/hooks/useApiClient';
import { ImageEntry } from '@client/hooks/useImageUpload';
import {
	ProcessingProfile,
	ReturnProfile,
	ShippingProfile,
	useListingForm,
} from '@client/hooks/useListingForm';
import { useShopManager } from '@client/providers/ShopManagerProvider';
import { callApi } from '@client/utils/apiUtils';
import {
	CombinationsData,
	ListingEditData,
	VariationsData,
} from '@heirloom/common/contract';
import { useEffect, useRef, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

type FormProps = {
	shopShortId: string;
	listingData: ListingEditData;
	processingProfiles: ProcessingProfile[];
	shippingProfiles: ShippingProfile[];
	returnProfiles: ReturnProfile[];
	listingImageBaseUrl: string;
};

const ListingEditForm = ({
	shopShortId,
	listingData,
	processingProfiles,
	shippingProfiles,
	returnProfiles,
	listingImageBaseUrl,
}: FormProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const initialImageEntries: ImageEntry[] =
		listingData.imageUuids.map((uuid) => ({
			previewUrl: `${listingImageBaseUrl}/${uuid}.jpg`,
			uuid,
			isUploading: false,
			uploadFailed: false,
		}));

	const form = useListingForm({
		shopShortId,
		initialTitle: listingData.title,
		initialSubtitle: listingData.subtitle ?? '',
		initialCategoryId: listingData.categoryId,
		initialPriceCents: listingData.priceCents,
		initialUpc: listingData.upc ?? '',
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
		initialProcessingProfiles: processingProfiles,
		initialShippingProfiles: shippingProfiles,
		initialReturnProfiles: returnProfiles,
		initialDescrSections: listingData.fullDescr ?? [],
		initialVariations: listingData.variations as VariationsData,
		initialCombinations:
			listingData.combinations as CombinationsData,
	});

	const handleSave = () => {
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
		// TODO: call update API
	};

	return (
		<ListingFormLayout
			form={form}
			containerRef={containerRef}
			actions={
				<Button
					size="lg"
					width={175}
					fontSize={20}
					onClick={handleSave}
					disabled={form.isUploadingImages}
					loading={form.isUploadingImages}
				>
					<FaSave />
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
		profilesLoading,
	} = useShopManager();

	const [listingData, setListingData] =
		useState<ListingEditData | null>(null);
	const [listingLoading, setListingLoading] = useState(true);

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
			listingData={listingData}
			processingProfiles={processingProfiles}
			shippingProfiles={shippingProfiles}
			returnProfiles={returnProfiles}
			listingImageBaseUrl={`${process.env.LISTING_IMAGES_URL}/${shopShortId}`}
		/>
	);
};
