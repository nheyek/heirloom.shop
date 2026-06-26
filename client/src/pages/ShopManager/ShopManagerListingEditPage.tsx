import { Button } from '@chakra-ui/react';
import { ListingFormLayout } from '@client/components/listingForm/ListingFormLayout';
import { useListingForm } from '@client/hooks/useListingForm';
import { useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export const ShopManagerListingEditPage = () => {
	const { shortId: shopShortId } = useParams<{
		shortId: string;
		listingShortId: string;
	}>();
	const form = useListingForm({ shopShortId: shopShortId! });
	const containerRef = useRef<HTMLDivElement>(null);

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

	const isBlocked = form.isUploadingImages;

	return (
		<ListingFormLayout
			form={form}
			containerRef={containerRef}
			actions={
				<Button
					size="xl"
					width={180}
					fontSize={22}
					onClick={handleSave}
					disabled={isBlocked}
					loading={isBlocked}
				>
					<FaCheckCircle />
					Save Changes
				</Button>
			}
		/>
	);
};
