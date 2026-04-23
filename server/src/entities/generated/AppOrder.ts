import { Collection, type Rel, defineEntity, p } from '@mikro-orm/core';
import { AppOrderItem } from './AppOrderItem.js';
import { AppUser } from './AppUser.js';

export class AppOrder {
  id!: number;
  shippingAddress!: any;
  subtotal!: number;
  taxTotal!: number;
  orderStatus!: string;
  paymentIntentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  shippingPrice!: number;
  shortId!: string;
  email!: string;
  accessKey!: string;
  user?: Rel<AppUser>;
  appOrderItemCollection = new Collection<AppOrderItem>(this);
}

export const AppOrderSchema = defineEntity({
  class: AppOrder,
  properties: {
    id: p.integer().primary(),
    shippingAddress: p.json(),
    subtotal: p.integer(),
    taxTotal: p.integer(),
    orderStatus: p.string().length(32),
    paymentIntentId: p.string().length(64).nullable(),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    shippingPrice: p.integer(),
    shortId: p.string().length(10).unique('app_order_short_id_key'),
    email: p.string(),
    accessKey: p.string().length(64),
    user: () => p.manyToOne(AppUser).updateRule('no action').deleteRule('no action').nullable(),
    appOrderItemCollection: () => p.oneToMany(AppOrderItem).mappedBy('order'),
  },
});
