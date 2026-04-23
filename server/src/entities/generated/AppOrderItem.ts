import { type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { AppOrder } from './AppOrder.js';

@Entity()
export class AppOrderItem {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AppOrder, updateRule: 'no action', deleteRule: 'cascade' })
  order!: Rel<AppOrder>;

  @Property({ type: 'json' })
  snapshot!: any;

  @Property({ type: 'json' })
  fulfillment: any & Opt = '{}';

}
