import { ListingDescrSection } from '@client/hooks/useListingForm';
import { SortableFieldList } from '@client/components/listingForm/SortableFieldList';

type Props = {
	sections: ListingDescrSection[];
	ids: string[];
	onEdit: (index: number) => void;
	onDelete: (index: number) => void;
	onReorder: (fromIndex: number, toIndex: number) => void;
};

export const DescrSectionList = ({ sections, ids, onEdit, onDelete, onReorder }: Props) => (
	<SortableFieldList
		items={sections.map((s, i) => ({ id: ids[i], label: s.title }))}
		onEdit={(id) => onEdit(ids.indexOf(id))}
		onDelete={(id) => onDelete(ids.indexOf(id))}
		onReorder={(fromId, toId) => onReorder(ids.indexOf(fromId), ids.indexOf(toId))}
	/>
);
