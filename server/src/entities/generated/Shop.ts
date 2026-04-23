import { Collection, type Rel, defineEntity, p } from '@mikro-orm/core';
import { Country } from './Country.js';
import { Listing } from './Listing.js';
import { ShippingOrigin } from './ShippingOrigin.js';
import { ShippingProfile } from './ShippingProfile.js';
import { ShopUserRole } from './ShopUserRole.js';

export class Shop {
  id!: number;
  title!: string;
  createdAt?: Date;
  updatedAt?: Date;
  profileRichText?: string;
  profileImageUuid?: string;
  shopLocation?: string;
  classification?: string;
  country?: Rel<Country>;
  categoryIcon?: string;
  shortId?: string;
  listingCollection = new Collection<Listing>(this);
  shippingOriginCollection = new Collection<ShippingOrigin>(this);
  shippingProfileCollection = new Collection<ShippingProfile>(this);
  shopUserRoleCollection = new Collection<ShopUserRole>(this);
}

export const ShopSchema = defineEntity({
  class: Shop,
  properties: {
    id: p.integer().primary(),
    title: p.string().length(128),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    profileRichText: p.text().nullable(),
    profileImageUuid: p.string().length(36).nullable(),
    shopLocation: p.string().length(64).nullable(),
    classification: p.string().length(32).nullable(),
    country: () => p.manyToOne(Country).updateRule('no action').nullable(),
    categoryIcon: p.string().length(64).nullable(),
    shortId: p.string().length(10).nullable().index('idx_shop_short_id').unique('shop_short_id_key'),
    listingCollection: () => p.oneToMany(Listing).mappedBy('shop'),
    shippingOriginCollection: () => p.oneToMany(ShippingOrigin).mappedBy('shop'),
    shippingProfileCollection: () => p.oneToMany(ShippingProfile).mappedBy('shop'),
    shopUserRoleCollection: () => p.oneToMany(ShopUserRole).mappedBy('shop'),
  },
});
