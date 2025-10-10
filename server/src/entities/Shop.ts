import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Shop {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  title!: string;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property({ type: 'text', nullable: true })
  profileRichText?: string;

  @Property({ length: 36, nullable: true })
  profileImageUuid?: string;

}
