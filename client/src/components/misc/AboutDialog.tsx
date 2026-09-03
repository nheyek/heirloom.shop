import { RichTextDialog } from '@client/components/richText/RichTextDialog';
import { ABOUT_HEIRLOOM_HTML } from '@client/constants';

type Props = {
	open: boolean;
	onClose: () => void;
};

export const AboutDialog = ({ open, onClose }: Props) => (
	<RichTextDialog
		title="About Heirloom"
		open={open}
		onClose={onClose}
		htmlString={ABOUT_HEIRLOOM_HTML}
	/>
);
