import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/decorators/legacy';
import { Collection } from '@mikro-orm/core';
import { AppOrderItem } from './AppOrderItem';
import { AppUser } from './AppUser';

@Entity()
export class AppOrder {

  @PrimaryKey()
  id!: number;

  @Property({ type: 'json' })
  shippingAddress!: any;

  @Property()
  subtotal!: number;

  @Property()
  taxTotal!: number;

  @Property({ length: 32 })
  orderStatus!: string;

  @Property({ length: 64, nullable: true })
  paymentIntentId?: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property()
  shippingPrice!: number;

  @Property({ length: 10, unique: 'app_order_short_id_key' })
  shortId!: string;

  @Property()
  email!: string;

  @Property({ length: 64 })
  accessKey!: string;

  @ManyToOne({ entity: () => AppUser, nullable: true })
  user?: AppUser;

  @OneToMany({ entity: () => AppOrderItem, mappedBy: 'order' })
  appOrderItemCollection = new Collection<AppOrderItem>(this);

}
