import { Collection, defineEntity, p } from '@mikro-orm/core';
import { AppOrder } from './AppOrder.js';
import { ShopUserRole } from './ShopUserRole.js';
import { UserFavoriteListing } from './UserFavoriteListing.js';

export class AppUser {
  id!: number;
  username!: string;
  email!: string;
  createdAt?: Date;
  updatedAt?: Date;
  appOrderCollection = new Collection<AppOrder>(this);
  shopUserRoleCollection = new Collection<ShopUserRole>(this);
  userFavoriteListingCollection = new Collection<UserFavoriteListing>(this);
}

export const AppUserSchema = defineEntity({
  class: AppUser,
  properties: {
    id: p.integer().primary(),
    username: p.string().length(64).unique('unique_username'),
    email: p.string().length(128),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    appOrderCollection: () => p.oneToMany(AppOrder).mappedBy('user'),
    shopUserRoleCollection: () => p.oneToMany(ShopUserRole).mappedBy('user'),
    userFavoriteListingCollection: () => p.oneToMany(UserFavoriteListing).mappedBy('user'),
  },
});
