import {
	Collection,
	Entity,
	OneToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { ShopUserRole } from './ShopUserRole';
import { UserFavoriteListing } from './UserFavoriteListing';

@Entity()
export class AppUser {
	@PrimaryKey()
	id!: number;

	@Property({ length: 64, unique: 'unique_username' })
	username!: string;

	@Property({ length: 128 })
	email!: string;

	@Property({
		columnType: 'timestamp(6)',
		nullable: true,
		defaultRaw: `CURRENT_TIMESTAMP`,
	})
	createdAt?: Date;

	@Property({
		columnType: 'timestamp(6)',
		nullable: true,
		defaultRaw: `CURRENT_TIMESTAMP`,
	})
	updatedAt?: Date;

	@OneToMany({
		entity: () => ShopUserRole,
		mappedBy: 'user',
	})
	shopUserRoleCollection = new Collection<ShopUserRole>(
		this,
	);

	@OneToMany({
		entity: () => UserFavoriteListing,
		mappedBy: 'user',
	})
	userFavoriteListingCollection =
		new Collection<UserFavoriteListing>(this);
}
