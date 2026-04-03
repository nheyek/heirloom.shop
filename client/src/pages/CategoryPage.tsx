import {
	Box,
	Breadcrumb,
	HStack,
	Link,
	Skeleton,
	Stack,
} from '@chakra-ui/react';
import { ListingCardData } from '@common/types/ListingCardData';
import { Fragment, useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import {
	Link as RouterLink,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { AppError } from '../components/feedback/AppError';
import { CategoryGrid } from '../components/layout/CategoryGrid';
import { ListingGrid } from '../components/layout/ListingGrid';
import { categoryClient } from '../hooks/categoryClient';
import { useCategories } from '../providers/CategoriesProvider';
import { FONT_DECORATIVE } from '../theme';

export const CategoryPage = () => {
	const { id } = useParams<{ id: string }>();

	const {
		getCategory,
		getChildCategories,
		getAncestorCategories,
		categoriesLoading,
		categoriesError,
	} = useCategories();

	const category = id ? getCategory(id?.toUpperCase()) : null;
	const childCategories = id ? getChildCategories(id) : [];
	const ancestorCategories = id ? getAncestorCategories(id) : [];

	const [listings, setListings] = useState<ListingCardData[]>([]);
	const [listingsLoading, setListingsLoading] = useState(true);
	const [listingsError, setListingsError] = useState<string | null>(
		null,
	);
	const isLoading = listingsLoading || categoriesLoading;

	const navigate = useNavigate();

	const loadListings = async () => {
		const response = await categoryClient.getListings({
			params: { id: id! },
		});
		if (response.status === 200) {
			setListings(response.body);
		} else {
			setListingsError('Failed to load listings');
		}

		setListingsLoading(false);
	};

	useEffect(() => {
		setListingsLoading(true);
		setListingsError(null);
		setListings([]);

		setTimeout(loadListings, 500);
	}, [id]);

	if (categoriesError) {
		return (
			<AppError
				title={'Failed to load categories'}
				content={
					<>
						Click{' '}
						<Link
							onClick={() => navigate('/')}
							style={{
								textDecoration: 'underline',
							}}
						>
							here
						</Link>{' '}
						to return to the homepage.
					</>
				}
			/>
		);
	}

	return (
		<Stack
			py={5}
			gap={5}
		>
			<Box px={5}>
				{isLoading && (
					<Skeleton
						height={35}
						width={300}
					/>
				)}
				{!isLoading && category && (
					<Breadcrumb.Root>
						<Breadcrumb.List
							fontSize={22}
							fontFamily={FONT_DECORATIVE}
							flexWrap="wrap"
							rowGap={3}
						>
							<Breadcrumb.Item whiteSpace="nowrap">
								<Link asChild>
									<RouterLink to="/">
										<HStack gap={3}>
											<FaHome size={24} />
											Home
										</HStack>
									</RouterLink>
								</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />

							{ancestorCategories.map((ancestor) => (
								<Fragment key={ancestor.id}>
									<Breadcrumb.Item
										key={ancestor.id}
									>
										<Link
											whiteSpace="nowrap"
											onClick={() =>
												navigate(
													`/category/${ancestor.id.toLowerCase()}`,
												)
											}
										>
											{ancestor.title}
										</Link>
									</Breadcrumb.Item>
									<Breadcrumb.Separator />
								</Fragment>
							))}

							<Breadcrumb.Item>
								<Breadcrumb.CurrentLink
									fontWeight={500}
									whiteSpace="nowrap"
								>
									{category?.title}
								</Breadcrumb.CurrentLink>
							</Breadcrumb.Item>
						</Breadcrumb.List>
					</Breadcrumb.Root>
				)}
			</Box>

			<CategoryGrid
				isLoading={isLoading}
				categories={childCategories}
			/>

			{listingsError ? (
				<AppError title={listingsError} />
			) : (
				<Box px={5}>
					<ListingGrid
						listings={listings}
						isLoading={isLoading}
					/>
				</Box>
			)}
		</Stack>
	);
};
