import { Collection, type Rel, defineEntity, p } from '@mikro-orm/core';
import { Listing } from './Listing.js';
import { Shop } from './Shop.js';

export class ShippingProfile {
  id!: number;
  profileName!: string;
  flatShippingRateCents?: number;
  shippingDaysMin?: number;
  shippingDaysMax?: number;
  createdAt?: Date;
  updatedAt?: Date;
  shop?: Rel<Shop>;
  standardProfileKey?: string;
  listingCollection = new Collection<Listing>(this);
}

export const ShippingProfileSchema = defineEntity({
  class: ShippingProfile,
  properties: {
    id: p.integer().primary(),
    profileName: p.string().length(128),
    flatShippingRateCents: p.integer().nullable(),
    shippingDaysMin: p.integer().nullable(),
    shippingDaysMax: p.integer().nullable(),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    shop: () => p.manyToOne(Shop).updateRule('no action').deleteRule('cascade').nullable(),
    standardProfileKey: p.string().length(64).nullable().unique('unique_shop_standard_profile_key'),
    listingCollection: () => p.oneToMany(Listing).mappedBy('shippingProfile'),
  },
});
