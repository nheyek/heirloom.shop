import { type Opt, type Rel, defineEntity, p } from '@mikro-orm/core';
import { AppOrder } from './AppOrder.js';

export class AppOrderItem {
  id!: number;
  order!: Rel<AppOrder>;
  snapshot!: any;
  fulfillment: any & Opt = '{}';
}

export const AppOrderItemSchema = defineEntity({
  class: AppOrderItem,
  properties: {
    id: p.integer().primary(),
    order: () => p.manyToOne(AppOrder).updateRule('no action').deleteRule('cascade'),
    snapshot: p.json(),
    fulfillment: p.json(),
  },
});
