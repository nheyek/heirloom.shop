import { type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/decorators/es';
import { AppUser } from './AppUser.js';
import { Listing } from './Listing.js';

@Entity()
@Unique({ name: 'user_favorite_listing_user_id_listing_id_key', properties: ['user', 'listing'] })
export class UserFavoriteListing {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AppUser, updateRule: 'no action', deleteRule: 'cascade', index: 'idx_user_favorite_listing_user_id' })
  user!: Rel<AppUser>;

  @ManyToOne({ entity: () => Listing, updateRule: 'no action', deleteRule: 'cascade', index: 'idx_user_favorite_listing_listing_id' })
  listing!: Rel<Listing>;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
