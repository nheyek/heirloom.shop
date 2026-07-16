import { Breadcrumb, HStack, Link } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { useCategories } from '@client/providers/CategoriesProvider';
import { displayFontFamily } from '@client/theme';
import { Fragment } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
	categoryId: string;
	fontSize?: number;
	showHome?: boolean;
	currentIsLink?: boolean;
};

export const CategoryBreadcrumb = ({
	categoryId,
	fontSize = 22,
	showHome = false,
	currentIsLink = false,
}: Props) => {
	const { getCategory, getAncestorCategories } = useCategories();

	const category = getCategory(categoryId);
	const ancestors = getAncestorCategories(categoryId);

	if (!category) return null;

	return (
		<Breadcrumb.Root>
			<Breadcrumb.List
				fontSize={fontSize}
				fontFamily={displayFontFamily}
				flexWrap="wrap"
				rowGap={2}
			>
				{showHome && (
					<>
						<Breadcrumb.Item whiteSpace="nowrap">
							<Link asChild>
								<RouterLink to="/">
									<HStack gap={3}>
										<FaHome size={fontSize} />
										Home
									</HStack>
								</RouterLink>
							</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
					</>
				)}

				{ancestors.map((ancestor) => (
					<Fragment key={ancestor.id}>
						<Breadcrumb.Item whiteSpace="nowrap">
							<Link asChild>
								<RouterLink
									to={`/${CLIENT_ROUTES.category}/${ancestor.id.toLowerCase()}`}
								>
									{ancestor.title}
								</RouterLink>
							</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
					</Fragment>
				))}

				<Breadcrumb.Item>
					{currentIsLink ? (
						<Link asChild>
							<RouterLink
								to={`/${CLIENT_ROUTES.category}/${category.id.toLowerCase()}`}
							>
								{category.title}
							</RouterLink>
						</Link>
					) : (
						<Breadcrumb.CurrentLink
							fontWeight={500}
							whiteSpace="nowrap"
						>
							{category.title}
						</Breadcrumb.CurrentLink>
					)}
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	);
};
