import { Button, HStack } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listingForm/ListingFormLayout';
import { ListingFormSkeleton } from '@client/components/listingForm/ListingFormSkeleton';
import { useListingForm } from '@client/hooks/useListingForm';
import { useShopManager } from '@client/providers/ShopManagerProvider';
import { FaCheckCircle, FaSave } from 'react-icons/fa';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

export const ShopManagerListingCreatePage = () => {
	const { shortId: shopShortId } = useParams<{ shortId: string }>();
	const { processingProfiles, shippingProfiles, returnProfiles, profilesLoading } = useShopManager();
	const form = useListingForm({
		shopShortId: shopShortId!,
		initialProcessingProfiles: processingProfiles,
		initialShippingProfiles: shippingProfiles,
		initialReturnProfiles: returnProfiles,
	});
	const containerRef = useRef<HTMLDivElement>(null);

	if (profilesLoading) {
		return <ListingFormSkeleton />;
	}

	const handleCreate = () => {
		if (!form.validate()) {
			requestAnimationFrame(() => {
				containerRef.current
					?.querySelector('[data-invalid]')
					?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			});
			return;
		}
		// TODO: call create API
	};

	const isBlocked = form.isUploadingImages;

	return (
		<ListingFormLayout
			form={form}
			containerRef={containerRef}
			actions={
				<HStack>
					<Button
						size="lg"
						variant="outline"
						fontSize={20}
						onClick={handleCreate}
						disabled={isBlocked}
						loading={isBlocked}
					>
						<FaSave />
						Save Draft
					</Button>
					<Button
						size="lg"
						fontSize={20}
						onClick={handleCreate}
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
