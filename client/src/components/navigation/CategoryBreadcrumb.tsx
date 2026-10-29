import { Breadcrumb, Link } from '@chakra-ui/react';
import { CLIENT_ROUTES } from '@client/constants';
import { useCategories } from '@client/providers/CategoriesProvider';
import { displayFontFamily } from '@client/theme';
import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
	categoryId: string;
	fontSize?: number;
	color?: string;
	currentIsLink?: boolean;
};

export const CategoryBreadcrumb = ({
	categoryId,
	fontSize = 24,
	color,
	currentIsLink = false,
}: Props) => {
	const { getCategory, getAncestorCategories } = useCategories();

	const category = getCategory(categoryId);
	const ancestors = getAncestorCategories(categoryId);

	if (!category) return null;

	const colorProps = color ? { color } : {};

	return (
		<Breadcrumb.Root>
			<Breadcrumb.List
				fontSize={fontSize}
				fontFamily={displayFontFamily}
				flexWrap="wrap"
				rowGap={2}
				{...colorProps}
			>
				{ancestors.map((ancestor) => (
					<Fragment key={ancestor.id}>
						<Breadcrumb.Item whiteSpace="nowrap">
							<Link
								asChild
								{...colorProps}
							>
								<RouterLink
									to={`/${CLIENT_ROUTES.category}/${ancestor.id.toLowerCase()}`}
								>
									{ancestor.title}
								</RouterLink>
							</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator {...colorProps} />
					</Fragment>
				))}

				<Breadcrumb.Item>
					{currentIsLink ? (
						<Link
							asChild
							{...colorProps}
						>
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
							{...colorProps}
						>
							{category.title}
						</Breadcrumb.CurrentLink>
					)}
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	);
};
