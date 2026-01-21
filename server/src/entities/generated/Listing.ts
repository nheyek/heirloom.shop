import { Entity, ManyToOne, type Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { Country } from './Country';
import { ListingCategory } from './ListingCategory';
import { ReturnExchangeProfile } from './ReturnExchangeProfile';
import { ShippingOrigin } from './ShippingOrigin';
import { ShippingProfile } from './ShippingProfile';
import { Shop } from './Shop';

@Entity()
export class Listing {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  title!: string;

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

  @ManyToOne({ entity: () => Shop, deleteRule: 'cascade' })
  shop!: Shop;

  @ManyToOne({ entity: () => Country, deleteRule: 'set null', nullable: true })
  country?: Country;

  @Property({ type: 'string[]', defaultRaw: `ARRAY[]::text[]` })
  imageUuids!: string[] & Opt;

  @ManyToOne({ entity: () => ShippingProfile, deleteRule: 'set null', nullable: true })
  shippingProfile?: ShippingProfile;

  @ManyToOne({ entity: () => ReturnExchangeProfile, deleteRule: 'set null', nullable: true })
  returnExchangeProfile?: ReturnExchangeProfile;

  @Property({ type: 'integer' })
  leadTimeDaysMin: number & Opt = 0;

  @Property({ type: 'integer' })
  leadTimeDaysMax: number & Opt = 0;

  @ManyToOne({ entity: () => ShippingOrigin, deleteRule: 'set null', nullable: true })
  shippingOrigin?: ShippingOrigin;

  @Property({ type: 'json', nullable: true })
  fullDescr?: any;

}
