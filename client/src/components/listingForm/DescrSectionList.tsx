import { SortableFieldList } from '@client/components/listingForm/SortableFieldList';
import { ListingDescrSection } from '@client/components/listingForm/useListingForm';

type Props = {
	sections: ListingDescrSection[];
	ids: string[];
	onEdit: (index: number) => void;
	onDelete: (index: number) => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
	disabled?: boolean;
};

export const DescrSectionList = ({ sections, ids, onEdit, onDelete, onReorder, disabled }: Props) => (
	<SortableFieldList
		items={sections.map((s, i) => ({ id: ids[i], label: s.title }))}
		onEdit={(id) => onEdit(ids.indexOf(id))}
		onDelete={(id) => onDelete(ids.indexOf(id))}
		onReorder={(fromId, toId) => onReorder(ids.indexOf(fromId), ids.indexOf(toId))}
		disabled={disabled}
	/>
);
