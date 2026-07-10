import { Collection, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/decorators/es';
import { Listing } from './Listing.js';
import { Shop } from './Shop.js';

@Entity()
@Unique({ name: 'listing_personalization_profile_shop_name_unique', properties: ['shop', 'name'] })
export class ListingPersonalizationProfile {

  @PrimaryKey()
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @Property()
  costCents!: number;

  @Property({ length: 256, nullable: true })
  helperText?: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @OneToMany({ entity: () => Listing, mappedBy: 'personalizationProfile' })
  listingCollection = new Collection<Listing>(this);

}
