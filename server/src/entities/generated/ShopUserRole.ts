import { type Rel, defineEntity, p } from '@mikro-orm/core';
import { AppUser } from './AppUser.js';
import { Shop } from './Shop.js';

export class ShopUserRole {
  id!: number;
  shop!: Rel<Shop>;
  user!: Rel<AppUser>;
  shopRole!: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ShopUserRoleSchema = defineEntity({
  class: ShopUserRole,
  properties: {
    id: p.integer().primary(),
    shop: () => p.manyToOne(Shop).updateRule('no action').deleteRule('cascade'),
    user: () => p.manyToOne(AppUser).updateRule('no action').deleteRule('cascade'),
    shopRole: p.string().length(32),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
  },
});
