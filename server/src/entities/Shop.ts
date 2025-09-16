import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Shop {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  shopName!: string;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
