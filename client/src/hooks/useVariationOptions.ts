import { ImageListController } from '@client/components/listingForm/imageList/ImageListContext';
import { ImageEntry } from '@client/hooks/useImageUpload';
import { toastError } from '@client/toaster';
import { listingImageUrl } from '@client/utils/imageUtils';
import { LISTING_LIMITS } from '@heirloom/common/constants';
import { VariationOption } from '@heirloom/common/domain/listing';
import { arrayMove } from '@dnd-kit/sortable';
import { useRef, useState } from 'react';

export type OptionDraft = {
	id: string;
	name: string;
	priceCents: number | null;
	images: ImageEntry[];
};

type OptionFields = Pick<OptionDraft, 'name' | 'priceCents'>;

const MIN_OPTIONS = 2;

const blankOption = (): OptionDraft => ({
	id: crypto.randomUUID(),
	name: '',
	priceCents: null,
	images: [],
});

const blankOptions = () =>
	Array.from({ length: MIN_OPTIONS }, blankOption);

const imageEntriesFromUuids = (
	shopShortId: string,
	uuids: string[],
): ImageEntry[] =>
	uuids.map((uuid) => ({
		previewUrl: listingImageUrl(shopShortId, uuid),
		uuid,
		isUploading: false,
		uploadFailed: false,
	}));

const uploadedUuids = (images: ImageEntry[]) =>
	images
		.map((e) => e.uuid)
		.filter((uuid): uuid is string => uuid !== null);

export const optionsSnapshot = (options: OptionDraft[]) =>
	JSON.stringify(
		options.map((o) => ({
			id: o.id,
			name: o.name,
			priceCents: o.priceCents,
			imageUuids: uploadedUuids(o.images),
		})),
	);

export const useVariationOptions = (
	uploadImage: (file: File) => Promise<string | null>,
	shopShortId: string,
) => {
	const [options, setOptions] = useState(blankOptions);
	const latest = useRef(options);
	latest.current = options;

	const updateOption = (
		id: string,
		updater: (option: OptionDraft) => OptionDraft,
	) =>
		setOptions((prev) =>
			prev.map((o) => (o.id === id ? updater(o) : o)),
		);

	const load = (
		initial: Record<string, VariationOption> | null,
	): OptionDraft[] => {
		const loaded = initial
			? Object.entries(initial)
					.sort(([, a], [, b]) => a.order - b.order)
					.map(([id, o]) => ({
						id,
						name: o.name,
						priceCents: o.priceCents,
						images: imageEntriesFromUuids(
							shopShortId,
							o.imageUuids ?? [],
						),
					}))
			: blankOptions();
		setOptions(loaded);
		return loaded;
	};

	const add = () => {
		const option = blankOption();
		setOptions((prev) => [...prev, option]);
	};

	const remove = (id: string) => {
		latest.current
			.find((o) => o.id === id)
			?.images.forEach((e) =>
				URL.revokeObjectURL(e.previewUrl),
			);
		setOptions((prev) => prev.filter((o) => o.id !== id));
	};

	const update = (id: string, patch: Partial<OptionFields>) =>
		updateOption(id, (o) => ({ ...o, ...patch }));

	const move = (fromId: string, toId: string) =>
		setOptions((prev) =>
			arrayMove(
				prev,
				prev.findIndex((o) => o.id === fromId),
				prev.findIndex((o) => o.id === toId),
			),
		);

	const updateImages = (
		id: string,
		updater: (images: ImageEntry[]) => ImageEntry[],
	) =>
		updateOption(id, (o) => ({
			...o,
			images: updater(o.images),
		}));

	const addImages = (id: string, files: File[]) => {
		const current =
			latest.current.find((o) => o.id === id)?.images.length ??
			0;
		const remaining = LISTING_LIMITS.maxImages - current;
		const accepted = files.slice(0, Math.max(remaining, 0));
		if (accepted.length < files.length) {
			toastError(
				`You can only add up to ${LISTING_LIMITS.maxImages} images.`,
			);
		}

		accepted.forEach(async (file) => {
			const previewUrl = URL.createObjectURL(file);
			updateImages(id, (prev) => [
				...prev,
				{
					previewUrl,
					uuid: null,
					isUploading: true,
					uploadFailed: false,
				},
			]);
			const uuid = await uploadImage(file);
			updateImages(id, (prev) =>
				prev.map((e) =>
					e.previewUrl === previewUrl
						? {
								...e,
								uuid,
								isUploading: false,
								uploadFailed: uuid === null,
							}
						: e,
				),
			);
		});
	};

	const imageList = (id: string): ImageListController => ({
		entries: options.find((o) => o.id === id)?.images ?? [],
		add: (files) => addImages(id, files),
		remove: (index) =>
			updateImages(id, (prev) => {
				URL.revokeObjectURL(prev[index]?.previewUrl ?? '');
				return prev.filter((_, i) => i !== index);
			}),
		reorder: (entries) => updateImages(id, () => entries),
	});

	const toVariationOptions = (): Record<string, VariationOption> =>
		Object.fromEntries(
			options.map((o, order) => [
				o.id,
				{
					name: o.name.trim(),
					order,
					priceCents: o.priceCents,
					imageUuids: uploadedUuids(o.images),
				},
			]),
		);

	return {
		options,
		isUploading: options.some((o) =>
			o.images.some((e) => e.isUploading),
		),
		minOptions: MIN_OPTIONS,
		load,
		add,
		remove,
		update,
		move,
		imageList,
		toVariationOptions,
	};
};
