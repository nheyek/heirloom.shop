import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listingForm/ListingFormLayout';
import { ListingFormSkeleton } from '@client/components/listingForm/ListingFormSkeleton';
import {
	PersonalizationProfile,
	ProcessingProfile,
	ReturnProfile,
	ShippingProfile,
	useListingForm,
} from '@client/components/listingForm/useListingForm';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { MoreActionsCollapsible } from '@client/components/misc/MoreActionsCollapsible';
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
	VariationsData,
} from '@heirloom/common/contract';
import { useEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

type DeleteListingDialogProps = {
	open: boolean;
	title: string;
	pending: boolean;
	onCancel: () => void;
	onConfirm: () => void;
};

const DeleteListingDialog = ({
	open,
	title,
	pending,
	onCancel,
	onConfirm,
}: DeleteListingDialogProps) => {
	const [confirmationText, setConfirmationText] = useState('');

	const canConfirm = confirmationText === title;

	const handleCancel = () => {
		setConfirmationText('');
		onCancel();
	};

	return (
		<AppDialog
			title={`Delete "${title}"?`}
			open={open}
			onCancel={handleCancel}
			pending={pending}
			size="sm"
			titleProps={{ truncate: true }}
			footer={
				<DialogConfirmFooter
					onCancel={handleCancel}
					onConfirm={onConfirm}
					confirmLabel="Delete Listing"
					confirmColorPalette="red"
					confirmDisabled={!canConfirm}
					pending={pending}
				/>
			}
		>
			<Stack
				gap={3}
				fontSize={18}
			>
				<Text>
					This will permanently delete the listing,
					including all of its variations. This action
					cannot be undone.
				</Text>
				<Text>Enter the listing title below to confirm.</Text>
				<Input
					value={confirmationText}
					onChange={(e) =>
						setConfirmationText(e.target.value)
					}
					disabled={pending}
					fontSize={18}
					autoComplete="off"
				/>
			</Stack>
		</AppDialog>
	);
};

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
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletePending, setDeletePending] = useState(false);
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
		initialPriceCents: listingData.priceCents,
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
			toastError('Failed to save listing.', result.error);
			return;
		}
		navigate(
			`/${CLIENT_ROUTES.shop}/${shopShortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}`,
		);
	};

	const handleDeleteConfirm = async () => {
		setDeletePending(true);
		const result = await callApi(
			apiClient.shopManager.deleteListing({
				params: { shopId: shopShortId, listingShortId },
				body: {},
			}),
		);
		setDeletePending(false);
		if (result.error !== null) {
			toastError('Failed to delete listing. Please try again.');
			return;
		}
		setDeleteDialogOpen(false);
		navigate(
			`/${CLIENT_ROUTES.shop}/${shopShortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}`,
		);
	};

	return (
		<>
			<ListingFormLayout
				form={form}
				containerRef={containerRef}
				disabled={savePending}
				actions={
					<Stack gap={5}>
						<Button
							size="lg"
							onClick={handleSave}
							disabled={
								!form.isDirty ||
								form.isUploadingImages ||
								savePending
							}
							loading={
								form.isUploadingImages || savePending
							}
						>
							<FaCheckCircle />
							Save Changes
						</Button>
						<MoreActionsCollapsible
							disabled={savePending}
						>
							<Button
								size="md"
								fontSize={18}
								colorPalette="red"
								onClick={() =>
									setDeleteDialogOpen(true)
								}
							>
								<FaTrashAlt />
								Delete Listing
							</Button>
						</MoreActionsCollapsible>
					</Stack>
				}
			/>
			<DeleteListingDialog
				open={deleteDialogOpen}
				title={listingData.title}
				pending={deletePending}
				onCancel={() => setDeleteDialogOpen(false)}
				onConfirm={handleDeleteConfirm}
			/>
		</>
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
