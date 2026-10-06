import {
	Box,
	HStack,
	IconButton,
	Input,
	RadioGroup,
	Stack,
} from '@chakra-ui/react';
import { PriceInput } from '@client/components/input/PriceInput';
import { AddImagesButton } from '@client/components/listingForm/imageList/AddImagesButton';
import { ImageGrid } from '@client/components/listingForm/imageList/ImageGrid';
import {
	ImageListController,
	ImageListProvider,
} from '@client/components/listingForm/imageList/ImageListContext';
import {
	ImageTile,
	RemoveImageButton,
} from '@client/components/listingForm/imageList/ImageTile';
import { OptionDraft } from '@client/hooks/useVariationOptions';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { FaGripHorizontal, FaTrashAlt } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const OPTION_IMAGE_TILE_WIDTH = 120;
const OPTION_IMAGE_TILE_GAP = 2;

type Props = {
	option: OptionDraft;
	imageList: ImageListController;
	invalid?: boolean;
	deletable?: boolean;
	showPrice: boolean;
	showImage: boolean;
	inputRef?: React.RefObject<HTMLInputElement | null>;
	onChange: (
		patch: Partial<Pick<OptionDraft, 'name' | 'priceCents'>>,
	) => void;
	onDelete: () => void;
	onTabKey?: () => void;
};

export const VariationOptionRow = ({
	option,
	imageList,
	invalid,
	deletable,
	showPrice,
	showImage,
	inputRef,
	onChange,
	onDelete,
	onTabKey,
}: Props) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: option.id });

	return (
		<ImageListProvider list={imageList}>
			<Stack
				ref={setNodeRef}
				style={{
					transform: CSS.Translate.toString(transform),
					transition,
				}}
				position="relative"
				bg={invalid ? 'red.50' : 'white'}
				{...(isDragging && { zIndex: 1 })}
			>
				<HStack
					px={2}
					minH={12}
					overflowX="auto"
				>
					<HStack gap={0}>
						<IconButton
							size="md"
							variant="ghost"
							cursor="grab"
							color="fg.muted"
							alignSelf="center"
							touchAction="none"
							flexShrink={0}
							{...attributes}
							{...listeners}
						>
							<FaGripHorizontal />
						</IconButton>
						{showImage && <AddImagesButton size="md" />}
					</HStack>

					<Input
						ref={inputRef}
						fontSize={18}
						minW={100}
						value={option.name}
						onChange={(e) =>
							onChange({ name: e.target.value })
						}
						onKeyDown={(e) => {
							if (
								e.key === 'Tab' &&
								!e.shiftKey &&
								!showPrice
							) {
								e.preventDefault();
								onTabKey?.();
							}
						}}
						placeholder="Option name"
						px={0}
						border="none"
					/>

					{showPrice && (
						<Box
							alignSelf="center"
							flexShrink={0}
						>
							<PriceInput
								value={option.priceCents}
								onChange={(v) =>
									onChange({ priceCents: v })
								}
								onKeyDown={(e) => {
									if (
										e.key === 'Tab' &&
										!e.shiftKey
									) {
										e.preventDefault();
										onTabKey?.();
									}
								}}
								enclosed={false}
							/>
						</Box>
					)}

					<RadioGroup.Item
						value={option.id}
						flexShrink={0}
						alignSelf="center"
					>
						<RadioGroup.ItemHiddenInput />
						<RadioGroup.ItemIndicator />
						<RadioGroup.ItemText fontSize={15}>
							Default
						</RadioGroup.ItemText>
					</RadioGroup.Item>

					<IconButton
						size="sm"
						variant="ghost"
						color="red.500"
						flexShrink={0}
						onClick={onDelete}
						disabled={!deletable}
					>
						<FaTrashAlt />
					</IconButton>
				</HStack>
				{showImage && imageList.entries.length > 0 && (
					<Box
						px={2}
						pb={2}
					>
						<ImageGrid gap={OPTION_IMAGE_TILE_GAP}>
							<ImageTile w={OPTION_IMAGE_TILE_WIDTH}>
								<RemoveImageButton
									size="2xs"
									top={1}
									right={1}
								>
									<FaXmark />
								</RemoveImageButton>
							</ImageTile>
						</ImageGrid>
					</Box>
				)}
			</Stack>
		</ImageListProvider>
	);
};
