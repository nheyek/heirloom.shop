import { Collection, type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/decorators/es';
import { Listing } from './Listing.js';
import { Shop } from './Shop.js';

@Entity()
@Unique({ name: 'listing_processing_profile_shop_name_unique', properties: ['shop', 'name'] })
export class ListingProcessingProfile {

  @PrimaryKey()
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @Property({ type: 'smallint' })
  minDays!: number;

  @Property({ type: 'smallint' })
  maxDays!: number;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @OneToMany({ entity: () => Listing, mappedBy: 'processingProfile' })
  listingCollection = new Collection<Listing>(this);

}
