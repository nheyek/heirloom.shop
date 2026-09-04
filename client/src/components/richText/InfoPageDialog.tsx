import { RichTextDialog } from '@client/components/richText/RichTextDialog';
import { InfoPageKey } from '@client/constants';
import { INFO_PAGES } from '@client/domain/infoPageContent';

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
	const { title, contentHtml } = INFO_PAGES[infoPageKey];

	return (
		<RichTextDialog
			title={title}
			open={open}
			onClose={onClose}
			htmlString={contentHtml}
		/>
	);
};
