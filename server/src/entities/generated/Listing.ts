import { Collection, type Opt } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Country } from './Country';
import { ListingCategory } from './ListingCategory';
import { ListingVariation } from './ListingVariation';
import { ReturnExchangeProfile } from './ReturnExchangeProfile';
import { ShippingOrigin } from './ShippingOrigin';
import { ShippingProfile } from './ShippingProfile';
import { Shop } from './Shop';
import { UserFavoriteListing } from './UserFavoriteListing';

@Entity()
export class Listing {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  title!: string;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @ManyToOne({ entity: () => ListingCategory, updateRule: 'no action', nullable: true })
  category?: ListingCategory;

  @Property({ length: 256, nullable: true })
  subtitle?: string;

  @Property({ type: 'integer' })
  priceCents: number & Opt = 0;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Shop;

  @ManyToOne({ entity: () => Country, updateRule: 'no action', nullable: true })
  country?: Country;

  @Property({ type: 'string[]', defaultRaw: `ARRAY[]::text[]` })
  imageUuids!: string[] & Opt;

  @ManyToOne({ entity: () => ShippingProfile, updateRule: 'no action', nullable: true })
  shippingProfile?: ShippingProfile;

  @ManyToOne({ entity: () => ReturnExchangeProfile, updateRule: 'no action', nullable: true })
  returnExchangeProfile?: ReturnExchangeProfile;

  @Property({ type: 'integer' })
  leadTimeDaysMin: number & Opt = 0;

  @Property({ type: 'integer' })
  leadTimeDaysMax: number & Opt = 0;

  @ManyToOne({ entity: () => ShippingOrigin, updateRule: 'no action', nullable: true })
  shippingOrigin?: ShippingOrigin;

  @Property({ type: 'json', nullable: true })
  fullDescr?: any;

  @Property({ length: 10, nullable: true, index: 'idx_listing_short_id', unique: 'listing_short_id_key' })
  shortId?: string;

  @OneToMany({ entity: () => ListingVariation, mappedBy: 'listing' })
  listingVariationCollection = new Collection<ListingVariation>(this);

  @OneToMany({ entity: () => UserFavoriteListing, mappedBy: 'listing' })
  userFavoriteListingCollection = new Collection<UserFavoriteListing>(this);

}
