import { type Opt, type Ref, defineEntity, p } from '@mikro-orm/core';
import { AppOrder } from './AppOrder';

export class AppOrderItem {
  id!: number;
  order!: Ref<AppOrder>;
  snapshot!: any;
  fulfillment: any & Opt = '{}';
}

export const AppOrderItemSchema = defineEntity({
  class: AppOrderItem,
  properties: {
    id: p.integer().primary(),
    order: () => p.manyToOne(AppOrder).ref().updateRule('no action').deleteRule('cascade'),
    snapshot: p.json(),
    fulfillment: p.json(),
  },
});
