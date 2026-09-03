import { RichTextDialog } from '@client/components/richText/RichTextDialog';
import { useInfoPages } from '@client/providers/InfoPagesProvider';
import { InfoPageKey } from '@heirloom/common/constants';

const INFO_PAGE_TITLES: Record<InfoPageKey, string> = {
	[InfoPageKey.ABOUT]: 'About Heirloom',
	[InfoPageKey.SHIPPING_RETURNS]: 'Shipping & Returns',
	[InfoPageKey.PRIVACY]: 'Privacy Policy',
	[InfoPageKey.TERMS_OF_SERVICE]: 'Terms of Service',
};

type Props = {
	infoPageKey: InfoPageKey;
	open: boolean;
	onClose: () => void;
};

export const InfoPageDialog = ({
	infoPageKey,
	open,
	onClose,
}: Props) => {
	const { getInfoPage } = useInfoPages();
	const htmlString = getInfoPage(infoPageKey);

	if (!htmlString) return null;

	return (
		<RichTextDialog
			title={INFO_PAGE_TITLES[infoPageKey]}
			open={open}
			onClose={onClose}
			htmlString={htmlString}
		/>
	);
};
