import { Collection, type Opt } from '@mikro-orm/core';
import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { AppOrder } from './AppOrder.js';
import { ShopUserRole } from './ShopUserRole.js';
import { UserFavoriteListing } from './UserFavoriteListing.js';
import { UserFavoriteShop } from './UserFavoriteShop.js';

@Entity()
export class AppUser {

  @PrimaryKey()
  id!: number;

  @Property({ length: 64, unique: 'unique_username' })
  username!: string;

  @Property({ length: 128 })
  email!: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property({ type: 'boolean' })
  isAdmin: boolean & Opt = false;

  @OneToMany({ entity: () => AppOrder, mappedBy: 'user' })
  appOrderCollection = new Collection<AppOrder>(this);

  @OneToMany({ entity: () => ShopUserRole, mappedBy: 'user' })
  shopUserRoleCollection = new Collection<ShopUserRole>(this);

  @OneToMany({ entity: () => UserFavoriteListing, mappedBy: 'user' })
  userFavoriteListingCollection = new Collection<UserFavoriteListing>(this);

  @OneToMany({ entity: () => UserFavoriteShop, mappedBy: 'user' })
  userFavoriteShopCollection = new Collection<UserFavoriteShop>(this);

}
