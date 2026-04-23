import { type Rel, defineEntity, p } from '@mikro-orm/core';
import { AppUser } from './AppUser.js';
import { Listing } from './Listing.js';

export class UserFavoriteListing {
  id!: number;
  user!: Rel<AppUser>;
  listing!: Rel<Listing>;
  createdAt?: Date;
}

export const UserFavoriteListingSchema = defineEntity({
  class: UserFavoriteListing,
  uniques: [
    {
      name: 'user_favorite_listing_user_id_listing_id_key',
      properties: ['user', 'listing'],
    },
  ],
  properties: {
    id: p.integer().primary(),
    user: () => p.manyToOne(AppUser).updateRule('no action').deleteRule('cascade').index('idx_user_favorite_listing_user_id'),
    listing: () => p.manyToOne(Listing).updateRule('no action').deleteRule('cascade').index('idx_user_favorite_listing_listing_id'),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
  },
});
