import { Collection } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Listing } from './Listing.js';
import { Shop } from './Shop.js';

@Entity()
export class ShippingProfile {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  profileName!: string;

  @Property({ nullable: true })
  flatShippingRateCents?: number;

  @Property({ nullable: true })
  shippingDaysMin?: number;

  @Property({ nullable: true })
  shippingDaysMax?: number;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade', nullable: true })
  shop?: Shop;

  @Property({ length: 64, nullable: true, unique: 'unique_shop_standard_profile_key' })
  standardProfileKey?: string;

  @OneToMany({ entity: () => Listing, mappedBy: 'shippingProfile' })
  listingCollection = new Collection<Listing>(this);

}
