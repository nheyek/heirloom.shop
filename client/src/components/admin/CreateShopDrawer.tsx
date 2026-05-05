import { AppDrawer } from '@client/components/layout/AppDrawer';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const CreateShopDrawer = ({ isOpen, onClose }: Props) => (
	<AppDrawer
		title="Create Shop"
		isOpen={isOpen}
		onClose={onClose}
	>
	</AppDrawer>
);
