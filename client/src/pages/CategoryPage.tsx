import { Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const CategoryPage = () => {
	const { id } = useParams();
	return <Heading>{id}</Heading>;
};
