import { Flex, Input, InputGroup } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const SEARCH_ICON_SIZE = 18;
const CLEAR_ICON_SIZE = 24;

type Props = {
	placeholder: string;
	minChars: number;
	delayMs: number;
	maxWidth?: number;
	onSearching: (isSearching: boolean) => void;
	onSearch: (query: string) => void;
};

export const SearchInput = (props: Props) => {
	const { minChars, delayMs, onSearching, onSearch } = props;
	const [value, setValue] = useState('');

	useEffect(() => {
		const query = value.trim().toLowerCase();
		if (query.length < minChars) {
			onSearch('');
			onSearching(false);
			return;
		}

		onSearching(true);
		const timer = setTimeout(() => {
			onSearch(query);
			onSearching(false);
		}, delayMs);
		return () => clearTimeout(timer);
	}, [value, minChars, delayMs, onSearch, onSearching]);

	return (
		<InputGroup
			maxW={props.maxWidth}
			flex={1}
			minWidth={0}
			startElement={<FaSearch size={SEARCH_ICON_SIZE} />}
			endElement={
				value && (
					<Flex
						cursor="pointer"
						onClick={() => setValue('')}
					>
						<IoClose size={CLEAR_ICON_SIZE} />
					</Flex>
				)
			}
		>
			<Input
				size="lg"
				fontSize={20}
				bg="#FFF"
				borderRadius="full"
				placeholder={props.placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</InputGroup>
	);
};
