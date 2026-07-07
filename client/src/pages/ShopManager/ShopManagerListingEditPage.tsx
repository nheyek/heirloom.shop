import {
	Button,
	CloseButton,
	Collapsible,
	Dialog,
	HStack,
	Input,
	Stack,
	Text,
	Wrap,
} from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listingForm/ListingFormLayout';
import { ListingFormSkeleton } from '@client/components/listingForm/ListingFormSkeleton';
import { CLIENT_ROUTES } from '@client/constants';
import { useApiClient } from '@client/hooks/useApiClient';
import { ImageEntry } from '@client/hooks/useImageUpload';
import {
	ProcessingProfile,
	ReturnProfile,
	ShippingProfile,
	useListingForm,
} from '@client/hooks/useListingForm';
import { useShopManager } from '@client/providers/ShopManagerProvider';
import { toastError } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import {
	CombinationsData,
	ListingEditData,
	VariationsData,
} from '@heirloom/common/contract';
import { useEffect, useRef, useState } from 'react';
import { FaCaretDown, FaSave, FaTrashAlt } from 'react-icons/fa';
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

	return (
		<Dialog.Root
			open={open}
			onOpenChange={({ open }) => {
				if (!open && !pending) {
					setConfirmationText('');
					onCancel();
				}
			}}
			onInteractOutside={pending ? undefined : onCancel}
			onEscapeKeyDown={pending ? undefined : onCancel}
			size="sm"
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title
							fontSize={22}
							fontWeight={500}
							marginRight={10}
							truncate
						>
							Delete "{title}"?
						</Dialog.Title>
						<CloseButton
							position="absolute"
							top={3}
							right={3}
							onClick={onCancel}
							disabled={pending}
						/>
					</Dialog.Header>
					<Dialog.Body pt={0}>
						<Stack
							gap={3}
							fontSize={18}
						>
							<Text>
								This will permanently delete the
								listing, including all of its
								variations. This action cannot be
								undone.
							</Text>
							<Text>
								Enter the listing title below to
								confirm.
							</Text>
							<Input
								value={confirmationText}
								onChange={(e) =>
									setConfirmationText(
										e.target.value,
									)
								}
								disabled={pending}
								fontSize={18}
								autoComplete="off"
							/>
						</Stack>
					</Dialog.Body>
					<Dialog.Footer>
						<HStack gap={2}>
							<Button
								size="md"
								fontSize={18}
								variant="subtle"
								onClick={onCancel}
								disabled={pending}
							>
								Cancel
							</Button>
							<Button
								size="md"
								fontSize={18}
								colorPalette="red"
								onClick={onConfirm}
								disabled={!canConfirm || pending}
								loading={pending}
							>
								Delete Listing
							</Button>
						</HStack>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};

type FormProps = {
	shopShortId: string;
	listingShortId: string;
	listingData: ListingEditData;
	processingProfiles: ProcessingProfile[];
	shippingProfiles: ShippingProfile[];
	returnProfiles: ReturnProfile[];
	listingImageBaseUrl: string;
};

const ListingEditForm = ({
	shopShortId,
	listingShortId,
	listingData,
	processingProfiles,
	shippingProfiles,
	returnProfiles,
	listingImageBaseUrl,
}: FormProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const apiClient = useApiClient();
	const navigate = useNavigate();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletePending, setDeletePending] = useState(false);
	const [savePending, setSavePending] = useState(false);

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
			toastError('Failed to save listing. Please try again.');
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
					<Wrap
						gap={3}
						alignItems="flex-start"
					>
						<Button
							size="md"
							fontSize={18}
							onClick={handleSave}
							disabled={
								form.isUploadingImages || savePending
							}
							loading={
								form.isUploadingImages || savePending
							}
						>
							<FaSave />
							Save Changes
						</Button>
						<Collapsible.Root disabled={savePending}>
							<Collapsible.Trigger asChild>
								<Button
									variant="subtle"
									size="md"
									fontSize={18}
									cursor="pointer"
									disabled={savePending}
								>
									Other Actions
									<Collapsible.Indicator
										transition="transform 0.2s"
										_open={{
											transform:
												'rotate(180deg)',
										}}
									>
										<FaCaretDown />
									</Collapsible.Indicator>
								</Button>
							</Collapsible.Trigger>
							<Collapsible.Content pt={2}>
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
							</Collapsible.Content>
						</Collapsible.Root>
					</Wrap>
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
			listingShortId={listingShortId!}
			listingData={listingData}
			processingProfiles={processingProfiles}
			shippingProfiles={shippingProfiles}
			returnProfiles={returnProfiles}
			listingImageBaseUrl={`${process.env.LISTING_IMAGES_URL}/${shopShortId}`}
		/>
	);
};
