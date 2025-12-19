import { CategoryCardData } from '@common/types/CategoryCardData';
import React, { useContext, useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

type CategoriesContextType = {
	getCategory: (id: string) => CategoryCardData | undefined;
	getChildCategories: (id: string | null) => CategoryCardData[];
	getAncestorCategories: (id: string) => CategoryCardData[];
	categoriesLoading: boolean;
	categoriesError: string | null;
};

const CategoriesContext = React.createContext<CategoriesContextType | null>(null);

export const CategoriesProvider = (props: { children: React.ReactNode }) => {
	const [categories, setCategories] = useState<Map<string, CategoryCardData>>(new Map());
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const getCategory = (id: string) => categories.get(id.toUpperCase());
	const getChildCategories = (id: string | null) =>
		Array.from(categories.values()).filter(
			(category) => (category.parentId || null) === (id?.toUpperCase() || null),
		);
	const getAncestorCategories = (id: string) => {
		const ancestors: CategoryCardData[] = [];
		let currentCategory = categories.get(id.toUpperCase());
		while (currentCategory?.parentId) {
			const parentCategory = categories.get(currentCategory.parentId);
			if (parentCategory) {
				ancestors.push(parentCategory);
				currentCategory = parentCategory;
			} else {
				break;
			}
		}
		return ancestors.reverse();
	};

	const { getPublicResource } = useApi();

	const loadCategories = async () => {
		try {
			await getPublicResource('categories').then((response: { data: CategoryCardData[] }) => {
				setCategories(
					new Map(
						response.data.map((category: CategoryCardData) => [category.id, category]),
					),
				);
			});
			setIsLoading(false);
		} catch (error) {
			setError('Failed to load category hierarchy');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
	}, []);

	return (
		<CategoriesContext.Provider
			value={{
				getCategory,
				getChildCategories,
				getAncestorCategories,
				categoriesLoading: isLoading,
				categoriesError: error,
			}}
		>
			{props.children}
		</CategoriesContext.Provider>
	);
};

export const useCategories = () => {
	const ctx = useContext(CategoriesContext);
	if (!ctx) {
		throw new Error('useCategoryHierarchy must be used within a CategoryHierarchyProvider');
	}
	return ctx;
};
