import { Breadcrumb, Icon, Link } from '@chakra-ui/react';
import { useCategories } from '@client/providers/CategoriesProvider';
import { getCategoryPath } from '@client/utils/categoryUtils';
import { Fragment } from 'react';
import { FaHouse } from 'react-icons/fa6';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
	categoryId: string;
};

export const CategoryBreadcrumb = ({ categoryId }: Props) => {
	const { getCategory, getAncestorCategories } = useCategories();

	const category = getCategory(categoryId);
	const ancestors = getAncestorCategories(categoryId);

	if (!category) return null;

	return (
		<Breadcrumb.Root>
			<Breadcrumb.List
				fontSize={26}
				flexWrap="wrap"
				rowGap={2}
			>
				<Breadcrumb.Item>
					<Link asChild>
						<RouterLink to="/">
							<Icon
								as={FaHouse}
								w={6}
								h={6}
							/>
						</RouterLink>
					</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />

				{ancestors.map((ancestor) => (
					<Fragment key={ancestor.id}>
						<Breadcrumb.Item whiteSpace="nowrap">
							<Link asChild>
								<RouterLink
									to={getCategoryPath(ancestor.id)}
								>
									{ancestor.title}
								</RouterLink>
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
						{category.title}
					</Breadcrumb.CurrentLink>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	);
};
