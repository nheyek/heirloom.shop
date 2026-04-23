import { Collection, type Ref, defineEntity, p } from '@mikro-orm/core';
import { Listing } from './Listing';
import { Shop } from './Shop';

export class ShippingOrigin {
  id!: number;
  locationName!: string;
  originZip!: string;
  shop!: Ref<Shop>;
  createdAt?: Date;
  updatedAt?: Date;
  listingCollection = new Collection<Listing>(this);
}

export const ShippingOriginSchema = defineEntity({
  class: ShippingOrigin,
  uniques: [{ name: 'unique_shop_origin_zip', properties: ['shop', 'originZip'] }],
  properties: {
    id: p.integer().primary(),
    locationName: p.string().length(128),
    originZip: p.decimal(),
    shop: () => p.manyToOne(Shop).ref().updateRule('no action').deleteRule('cascade'),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    listingCollection: () => p.oneToMany(Listing).mappedBy('shippingOrigin'),
  },
});
