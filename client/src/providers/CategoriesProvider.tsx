import { CategoryCardData } from '@common/types/CategoryCardData';
import React, { useContext, useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

type CategoryHierarchyContextType = {
	categories: CategoryCardData[];
	categoriesLoading: boolean;
	error: string | null;
};

const CategoryHierarchyContext = React.createContext<CategoryHierarchyContextType | null>(null);

export const CategoriesProvider = (props: { children: React.ReactNode }) => {
	const [categories, setCategories] = useState<CategoryCardData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const { getPublicResource } = useApi();

	const fetchCategoryHierarchy = async () => {
		try {
			await getPublicResource('categories').then((response) => {
				setCategories(response.data);
			});
			setIsLoading(false);
		} catch (error) {
			setError('Failed to load category hierarchy');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCategoryHierarchy();
	}, []);

	return (
		<CategoryHierarchyContext.Provider
			value={{ categories, categoriesLoading: isLoading, error }}
		>
			{props.children}
		</CategoryHierarchyContext.Provider>
	);
};

export const useCategoryHierarchy = () => {
	const ctx = useContext(CategoryHierarchyContext);
	if (!ctx) {
		throw new Error('useCategoryHierarchy must be used within a CategoryHierarchyProvider');
	}
	return ctx;
};
