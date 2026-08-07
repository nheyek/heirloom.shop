import { type Rel } from '@mikro-orm/core';
import { Entity, OneToOne, PrimaryKey } from '@mikro-orm/decorators/es';
import { Listing } from './Listing.js';

@Entity()
export class FeaturedListing {

  @PrimaryKey()
  id!: number;

  @OneToOne({ entity: () => Listing, updateRule: 'no action', deleteRule: 'cascade', unique: 'featured_listing_listing_id_key' })
  listing!: Rel<Listing>;

}
