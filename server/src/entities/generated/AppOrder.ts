import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { AppOrderItem } from './AppOrderItem';
import { OrderStatus } from '@common/enums/OrderStatus';

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

  @Property({ type: 'string', length: 32 })
  orderStatus!: OrderStatus;

  @Property({ length: 64, nullable: true })
  paymentIntentId?: string;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property()
  shippingPrice!: number;

  @Property({ length: 10, unique: 'app_order_short_id_key' })
  shortId!: string;

  @Property()
  email!: string;

  @Property({ length: 64 })
  accessKey!: string;

  @OneToMany({ entity: () => AppOrderItem, mappedBy: 'order' })
  appOrderItemCollection = new Collection<AppOrderItem>(this);

}
