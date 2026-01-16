import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Shop } from './Shop';

@Entity()
export class ShippingOrigin {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  locationName!: string;

  @Property({ type: 'decimal', precision: 5, scale: 0 })
  originZip!: string;

  @ManyToOne({ entity: () => Shop, deleteRule: 'cascade' })
  shop!: Shop;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
