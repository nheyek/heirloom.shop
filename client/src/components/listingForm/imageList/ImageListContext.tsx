import { ImageEntry } from '@client/hooks/useImageUpload';
import { ReactNode, createContext, useContext } from 'react';

export type ImageListController = {
	entries: ImageEntry[];
	add: (files: File[]) => void;
	remove: (index: number) => void;
	reorder: (entries: ImageEntry[]) => void;
	disabled?: boolean;
};

type ImageListItem = {
	entry: ImageEntry;
	index: number;
};

const ImageListContext = createContext<ImageListController | null>(
	null,
);
const ImageListItemContext = createContext<ImageListItem | null>(
	null,
);

export const ImageListProvider = ({
	list,
	children,
}: {
	list: ImageListController;
	children: ReactNode;
}) => (
	<ImageListContext.Provider value={list}>
		{children}
	</ImageListContext.Provider>
);

export const ImageListItemProvider = ({
	entry,
	index,
	children,
}: ImageListItem & { children: ReactNode }) => (
	<ImageListItemContext.Provider value={{ entry, index }}>
		{children}
	</ImageListItemContext.Provider>
);

export const useImageList = () => {
	const list = useContext(ImageListContext);
	if (!list) {
		throw new Error(
			'useImageList must be used within ImageListProvider',
		);
	}
	return list;
};

export const useImageListItem = () => {
	const item = useContext(ImageListItemContext);
	if (!item) {
		throw new Error(
			'useImageListItem must be used within an ImageGrid',
		);
	}
	return item;
};
