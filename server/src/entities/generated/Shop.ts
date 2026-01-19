import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Country } from './Country';

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

  @Property({ length: 64, nullable: true })
  shopLocation?: string;

  @Property({ length: 32, nullable: true })
  classification?: string;

  @ManyToOne({ entity: () => Country, deleteRule: 'set null', nullable: true })
  country?: Country;

  @Property({ length: 64, nullable: true })
  categoryIcon?: string;

}
