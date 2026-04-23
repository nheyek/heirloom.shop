import { Collection, type IType, type Opt, defineEntity, p } from '@mikro-orm/core';
import { Country } from './Country';
import { ListingCategory } from './ListingCategory';
import { ListingVariation } from './ListingVariation';
import { ReturnExchangeProfile } from './ReturnExchangeProfile';
import { ShippingOrigin } from './ShippingOrigin';
import { ShippingProfile } from './ShippingProfile';
import { Shop } from './Shop';
import { UserFavoriteListing } from './UserFavoriteListing';

export class Listing {
  id!: number;
  title!: string;
  createdAt?: Date;
  updatedAt?: Date;
  category!: ListingCategory;
  subtitle?: string;
  priceCents: number & Opt = 0;
  shop!: Shop;
  country?: Country;
  imageUuids!: IType<string[], unknown> & Opt;
  shippingProfile?: ShippingProfile;
  returnExchangeProfile?: ReturnExchangeProfile;
  leadTimeDaysMin: number & Opt = 0;
  leadTimeDaysMax: number & Opt = 0;
  shippingOrigin?: ShippingOrigin;
  fullDescr?: any;
  shortId!: string;
  listingVariationCollection = new Collection<ListingVariation>(this);
  userFavoriteListingCollection = new Collection<UserFavoriteListing>(this);
}

export const ListingSchema = defineEntity({
  class: Listing,
  properties: {
    id: p.integer().primary(),
    title: p.string().length(128),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    category: () => p.manyToOne(ListingCategory).updateRule('no action').deleteRule('restrict'),
    subtitle: p.string().length(256).nullable(),
    priceCents: p.integer(),
    shop: () => p.manyToOne(Shop).updateRule('no action').deleteRule('cascade'),
    country: () => p.manyToOne(Country).updateRule('no action').nullable(),
    imageUuids: p.array().defaultRaw(`ARRAY[]::text[]`),
    shippingProfile: () => p.manyToOne(ShippingProfile).updateRule('no action').nullable(),
    returnExchangeProfile: () => p.manyToOne(ReturnExchangeProfile).updateRule('no action').nullable(),
    leadTimeDaysMin: p.integer(),
    leadTimeDaysMax: p.integer(),
    shippingOrigin: () => p.manyToOne(ShippingOrigin).updateRule('no action').nullable(),
    fullDescr: p.json().nullable(),
    shortId: p.string().length(10).index('idx_listing_short_id').unique('listing_short_id_key'),
    listingVariationCollection: () => p.oneToMany(ListingVariation).mappedBy('listing'),
    userFavoriteListingCollection: () => p.oneToMany(UserFavoriteListing).mappedBy('listing'),
  },
});
