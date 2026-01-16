import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ShippingProfile {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  profileName!: string;

  @Property({ type: 'decimal', precision: 5, scale: 0 })
  originZip!: string;

  @Property({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  flatShippingRateUsDollars?: string;

  @Property({ nullable: true })
  shippingDaysMin?: number;

  @Property({ nullable: true })
  shippingDaysMax?: number;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
