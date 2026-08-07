import {
	Button,
	Field,
	Skeleton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { AppError } from '@client/components/feedback/AppError';
import { AppDialog } from '@client/components/misc/AppDialog';
import { DialogConfirmFooter } from '@client/components/misc/DialogConfirmFooter';
import { MoreActionsCollapsible } from '@client/components/misc/MoreActionsCollapsible';
import { RichTextEditor } from '@client/components/richText/RichTextEditor';
import {
	ShopFormField,
	ShopFormFields,
	ShopFormInput,
} from '@client/components/shop/ShopFormFields';
import { useShopForm } from '@client/components/shop/useShopForm';
import { useApiClient } from '@client/hooks/useApiClient';
import { useMinDuration } from '@client/hooks/useMinDuration';
import { useShopManager } from '@client/providers/ShopManagerProvider';
import { useUserInfo } from '@client/providers/UserProvider';
import { TEXT_STYLES } from '@client/theme';
import { toastError, toastSuccess } from '@client/toaster';
import { callApi } from '@client/utils/apiUtils';
import {
	ShopCardData,
	ShopFulfillment,
} from '@heirloom/common/contract';
import { isValidEmail } from '@heirloom/common/utils/validationUtils';
import { validateProfileRichText } from '@heirloom/common/validation/shop';
import { useCallback, useEffect, useState } from 'react';
import {
	FaCheckCircle,
	FaExchangeAlt,
	FaSkullCrossbones,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';

type AssignOwnershipDialogProps = {
	open: boolean;
	pending: boolean;
	onCancel: () => void;
	onConfirm: (ownerEmail: string) => void;
};

const AssignOwnershipDialog = ({
	open,
	pending,
	onCancel,
	onConfirm,
}: AssignOwnershipDialogProps) => {
	const [ownerEmail, setOwnerEmail] = useState('');
	const [error, setError] = useState<string | null>(null);

	const handleCancel = () => {
		setOwnerEmail('');
		setError(null);
		onCancel();
	};

	const handleConfirm = () => {
		const trimmed = ownerEmail.trim();
		if (!trimmed) {
			setError('Owner email is required.');
			return;
		}
		if (!isValidEmail(trimmed)) {
			setError('Email format is invalid.');
			return;
		}
		onConfirm(trimmed);
	};

	return (
		<AppDialog
			title="Assign Ownership"
			open={open}
			onCancel={handleCancel}
			pending={pending}
			size="sm"
			footer={
				<DialogConfirmFooter
					onCancel={handleCancel}
					onConfirm={handleConfirm}
					confirmLabel="Confirm"
					confirmIcon={<FaCheckCircle />}
					pending={pending}
				/>
			}
		>
			<Stack gap={3}>
				<Text fontSize={18}>
					This shop will be switched to direct fulfillment,
					with the listed owner responsible for fulfillment
					and support.
				</Text>
				<ShopFormField
					label="Owner"
					error={error}
				>
					<ShopFormInput
						type="email"
						value={ownerEmail}
						onChange={(e) => {
							setOwnerEmail(e.target.value);
							setError(null);
						}}
						placeholder="owner@example.com"
						disabled={pending}
						autoFocus
					/>
				</ShopFormField>
			</Stack>
		</AppDialog>
	);
};

type CommandeerDialogProps = {
	title: string;
	open: boolean;
	pending: boolean;
	onCancel: () => void;
	onConfirm: () => void;
};

const CommandeerDialog = ({
	title,
	open,
	pending,
	onCancel,
	onConfirm,
}: CommandeerDialogProps) => (
	<AppDialog
		title={`Commandeer "${title}"?`}
		open={open}
		onCancel={onCancel}
		pending={pending}
		size="sm"
		footer={
			<DialogConfirmFooter
				onCancel={onCancel}
				onConfirm={onConfirm}
				confirmLabel="Commandeer"
				confirmIcon={<FaSkullCrossbones />}
				pending={pending}
			/>
		}
	>
		<Text fontSize={18}>
			This shop will be switched back to Heirloom fulfillment.
			The current owner will lose access.
		</Text>
	</AppDialog>
);

const ShopInfoForm = ({
	shopData,
	isAdmin,
}: {
	shopData: ShopCardData;
	isAdmin: boolean;
}) => {
	const apiClient = useApiClient();
	const { setDirectFulfillment } = useShopManager();
	const [isSaving, setIsSaving] = useState(false);
	const [richText, setRichText] = useState(
		shopData.profileRichText ?? '',
	);
	const [richTextError, setRichTextError] = useState<
		string | null
	>(null);

	const form = useShopForm({ initialData: shopData });

	const [fulfillment, setFulfillment] =
		useState<ShopFulfillment | null>(null);
	const [assignDialogOpen, setAssignDialogOpen] = useState(false);
	const [commandeerDialogOpen, setCommandeerDialogOpen] =
		useState(false);
	const [fulfillmentPending, setFulfillmentPending] =
		useState(false);

	useEffect(() => {
		if (!isAdmin) return;
		callApi(
			apiClient.admin.getShopFulfillment({
				params: { shopId: shopData.shortId },
			}),
		).then((result) => {
			if (result.error === null) setFulfillment(result.data);
		});
	}, [isAdmin, shopData.shortId]);

	const handleRichTextChange = useCallback((html: string) => {
		setRichText(html);
		setRichTextError(null);
	}, []);

	const handleSave = async () => {
		const sharedValid = form.validateSharedFields();

		const richTextFieldError = validateProfileRichText(richText);
		setRichTextError(richTextFieldError?.message ?? null);

		if (!sharedValid || richTextFieldError) return;

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

		toastSuccess('Changes saved', shopData.title);
	};

	const handleAssignOwnership = async (ownerEmail: string) => {
		setFulfillmentPending(true);
		const result = await callApi(
			apiClient.admin.updateShopFulfillment({
				params: { shopId: shopData.shortId },
				body: { directFulfillment: true, ownerEmail },
			}),
		);
		setFulfillmentPending(false);

		if (result.error !== null) {
			toastError('Failed to assign ownership.');
			return;
		}

		setFulfillment(result.data);
		setDirectFulfillment(result.data.directFulfillment);
		setAssignDialogOpen(false);
		toastSuccess('Ownership assigned', shopData.title);
	};

	const handleCommandeer = async () => {
		setFulfillmentPending(true);
		const result = await callApi(
			apiClient.admin.updateShopFulfillment({
				params: { shopId: shopData.shortId },
				body: { directFulfillment: false },
			}),
		);
		setFulfillmentPending(false);

		if (result.error !== null) {
			toastError('Failed to commandeer shop.');
			return;
		}

		setFulfillment(result.data);
		setDirectFulfillment(result.data.directFulfillment);
		setCommandeerDialogOpen(false);
		toastSuccess('Commandeered', shopData.title);
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
				<Field.Label textStyle={TEXT_STYLES.fieldLabel}>
					About
				</Field.Label>
				<RichTextEditor
					initialHtml={shopData.profileRichText}
					onChange={handleRichTextChange}
					invalid={!!richTextError}
					error={richTextError}
					maxHeight={500}
				/>
			</Field.Root>
			<Stack gap={5}>
				<Button
					size="lg"
					onClick={handleSave}
					disabled={isSaving || form.isUploadingImage}
					loading={isSaving || form.isUploadingImage}
				>
					<FaCheckCircle />
					Save Changes
				</Button>
				{isAdmin && fulfillment && (
					<MoreActionsCollapsible>
						<Button
							size="md"
							fontSize={18}
							variant="outline"
							onClick={() =>
								fulfillment.directFulfillment
									? setCommandeerDialogOpen(true)
									: setAssignDialogOpen(true)
							}
						>
							{fulfillment.directFulfillment ? (
								<FaSkullCrossbones />
							) : (
								<FaExchangeAlt />
							)}
							{fulfillment.directFulfillment
								? 'Commandeer'
								: 'Transfer Ownership'}
						</Button>
					</MoreActionsCollapsible>
				)}
			</Stack>

			<AssignOwnershipDialog
				open={assignDialogOpen}
				pending={fulfillmentPending}
				onCancel={() => setAssignDialogOpen(false)}
				onConfirm={handleAssignOwnership}
			/>
			<CommandeerDialog
				title={shopData.title}
				open={commandeerDialogOpen}
				pending={fulfillmentPending}
				onCancel={() => setCommandeerDialogOpen(false)}
				onConfirm={handleCommandeer}
			/>
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
	const { user } = useUserInfo();

	const [shopData, setShopData] = useState<ShopCardData | null>(
		null,
	);
	const [dataLoading, setDataLoading] = useState(true);
	const [loadError, setLoadError] = useState(false);
	const isLoading = useMinDuration(dataLoading);

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
			setDataLoading(false);
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
				<ShopInfoForm
					shopData={shopData}
					isAdmin={!!user?.isAdmin}
				/>
			)}
		</Stack>
	);
};
