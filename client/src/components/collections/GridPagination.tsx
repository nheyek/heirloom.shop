import {
	ButtonGroup,
	IconButton,
	Pagination,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

type Props = {
	count: number;
	pageSize: number;
	page: number;
	onPageChange: (page: number) => void;
};

export const GridPagination = (props: Props) => (
	<Pagination.Root
		count={props.count}
		pageSize={props.pageSize}
		page={props.page}
		onPageChange={(details) => props.onPageChange(details.page)}
	>
		<ButtonGroup
			variant="ghost"
			size="lg"
		>
			<Pagination.PrevTrigger asChild>
				<IconButton>
					<FaChevronLeft />
				</IconButton>
			</Pagination.PrevTrigger>

			<Pagination.Items
				render={(item) => (
					<IconButton
						variant={{
							base: 'ghost',
							_selected: 'subtle',
						}}
						fontSize={22}
					>
						{item.value}
					</IconButton>
				)}
			/>

			<Pagination.NextTrigger asChild>
				<IconButton>
					<FaChevronRight />
				</IconButton>
			</Pagination.NextTrigger>
		</ButtonGroup>
	</Pagination.Root>
);
