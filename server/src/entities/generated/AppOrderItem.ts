import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
} from '@mikro-orm/decorators/legacy';
import { type Opt } from '@mikro-orm/core';
import { AppOrder } from './AppOrder';

@Entity()
export class AppOrderItem {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AppOrder, deleteRule: 'cascade' })
  order!: AppOrder;

  @Property({ type: 'json' })
  snapshot!: any;

  @Property({ type: 'json' })
  fulfillment: any & Opt = '{}';

}
