import { Collection, type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { AppOrderItem } from './AppOrderItem.js';
import { AppUser } from './AppUser.js';

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

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

  @Property()
  shippingPrice!: number;

  @Property({ length: 10, unique: 'app_order_short_id_key' })
  shortId!: string;

  @Property()
  email!: string;

  @Property({ length: 64 })
  accessKey!: string;

  @ManyToOne({ entity: () => AppUser, updateRule: 'no action', deleteRule: 'no action', nullable: true })
  user?: Rel<AppUser>;

  @Property({ type: 'json' })
  timeline: any & Opt = '[]';

  @Property({ type: 'json', nullable: true })
  paymentDetails?: any;

  @OneToMany({ entity: () => AppOrderItem, mappedBy: 'order' })
  appOrderItemCollection = new Collection<AppOrderItem>(this);

}
