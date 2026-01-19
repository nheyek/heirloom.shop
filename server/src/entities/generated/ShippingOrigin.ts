import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Shop } from './Shop';

@Entity()
@Unique({ name: 'unique_shop_origin_zip', properties: ['shop', 'originZip'] })
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
