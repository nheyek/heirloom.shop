import { Entity, type Opt, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class AppOrder {

  @PrimaryKey()
  id!: number;

  @Property({ type: 'json' })
  items!: any;

  @Property({ type: 'json' })
  shippingAddress!: any;

  @Property()
  subtotal!: number;

  @Property()
  taxTotal!: number;

  @Property({ type: 'string', length: 32 })
  orderStatus: string & Opt = 'PENDING';

  @Property({ length: 64, nullable: true })
  paymentIntentId?: string;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property({ type: 'integer' })
  shippingPrice: number & Opt = 0;

  @Property({ length: 10, unique: 'app_order_short_id_key' })
  shortId!: string;

  @Property()
  email!: string;

}
