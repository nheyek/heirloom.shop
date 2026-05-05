import { Field, Fieldset } from '@chakra-ui/react';
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
		<Fieldset.Root size="lg">
			<Field.Root gap={0}></Field.Root>
		</Fieldset.Root>
	</AppDrawer>
);
