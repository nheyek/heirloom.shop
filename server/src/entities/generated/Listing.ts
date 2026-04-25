import { Collection, type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Country } from './Country.js';
import { ListingCategory } from './ListingCategory.js';
import { ListingVariation } from './ListingVariation.js';
import { ReturnExchangeProfile } from './ReturnExchangeProfile.js';
import { ShippingOrigin } from './ShippingOrigin.js';
import { ShippingProfile } from './ShippingProfile.js';
import { Shop } from './Shop.js';
import { UserFavoriteListing } from './UserFavoriteListing.js';

@Entity()
export class Listing {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  title!: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @ManyToOne({ entity: () => ListingCategory, updateRule: 'no action', deleteRule: 'restrict' })
  category!: Rel<ListingCategory>;

  @Property({ length: 256, nullable: true })
  subtitle?: string;

  @Property({ type: 'integer' })
  priceCents: number & Opt = 0;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @ManyToOne({ entity: () => Country, updateRule: 'no action', nullable: true })
  country?: Rel<Country>;

  @Property({ type: 'string[]', defaultRaw: `ARRAY[]::text[]` })
  imageUuids!: string[] & Opt;

  @ManyToOne({ entity: () => ShippingProfile, updateRule: 'no action', nullable: true })
  shippingProfile?: Rel<ShippingProfile>;

  @ManyToOne({ entity: () => ReturnExchangeProfile, updateRule: 'no action', nullable: true })
  returnExchangeProfile?: Rel<ReturnExchangeProfile>;

  @Property({ type: 'integer' })
  leadTimeDaysMin: number & Opt = 0;

  @Property({ type: 'integer' })
  leadTimeDaysMax: number & Opt = 0;

  @ManyToOne({ entity: () => ShippingOrigin, updateRule: 'no action', nullable: true })
  shippingOrigin?: Rel<ShippingOrigin>;

  @Property({ type: 'json', nullable: true })
  fullDescr?: any;

  @Property({ length: 10, index: 'idx_listing_short_id', unique: 'listing_short_id_key' })
  shortId!: string;

  @OneToMany({ entity: () => ListingVariation, mappedBy: 'listing' })
  listingVariationCollection = new Collection<ListingVariation>(this);

  @OneToMany({ entity: () => UserFavoriteListing, mappedBy: 'listing' })
  userFavoriteListingCollection = new Collection<UserFavoriteListing>(this);

}
