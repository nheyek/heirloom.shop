import { Collection, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/decorators/es';
import { Listing } from './Listing.js';
import { Shop } from './Shop.js';

@Entity()
@Unique({ name: 'listing_shipping_profile_shop_name_unique', properties: ['shop', 'name'] })
export class ListingShippingProfile {

  @PrimaryKey()
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @Property({ nullable: true })
  flatShippingRateCents?: number;

  @Property()
  shippingDaysMin!: number;

  @Property()
  shippingDaysMax!: number;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @Property({ type: 'decimal', precision: 5, scale: 0 })
  originZip!: string;

  @OneToMany({ entity: () => Listing, mappedBy: 'shippingProfile' })
  listingCollection = new Collection<Listing>(this);

}
