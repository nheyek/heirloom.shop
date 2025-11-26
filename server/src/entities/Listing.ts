import { Entity, ManyToOne, type Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { Country } from './Country';
import { ListingCategory } from './ListingCategory';
import { Shop } from './Shop';

@Entity()
export class Listing {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  title!: string;

  @Property({ type: 'text', nullable: true })
  descrRichText?: string;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @ManyToOne({ entity: () => ListingCategory, deleteRule: 'set null', nullable: true })
  category?: ListingCategory;

  @Property({ length: 256, nullable: true })
  subtitle?: string;

  @Property({ type: 'integer' })
  priceDollars: number & Opt = 0;

  @Property({ length: 36, nullable: true })
  primaryImageUuid?: string;

  @ManyToOne({ entity: () => Shop, deleteRule: 'cascade' })
  shop!: Shop;

  @ManyToOne({ entity: () => Country, deleteRule: 'set null', nullable: true })
  country?: Country;

}
