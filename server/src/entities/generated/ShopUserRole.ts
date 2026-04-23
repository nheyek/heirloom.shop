import { type Ref, defineEntity, p } from '@mikro-orm/core';
import { AppUser } from './AppUser';
import { Shop } from './Shop';

export class ShopUserRole {
  id!: number;
  shop!: Ref<Shop>;
  user!: Ref<AppUser>;
  shopRole!: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ShopUserRoleSchema = defineEntity({
  class: ShopUserRole,
  properties: {
    id: p.integer().primary(),
    shop: () => p.manyToOne(Shop).ref().updateRule('no action').deleteRule('cascade'),
    user: () => p.manyToOne(AppUser).ref().updateRule('no action').deleteRule('cascade'),
    shopRole: p.string().length(32),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
  },
});
