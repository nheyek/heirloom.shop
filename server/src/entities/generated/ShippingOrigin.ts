import { Collection } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/decorators/es';
import { Listing } from './Listing';
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

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Shop;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @OneToMany({ entity: () => Listing, mappedBy: 'shippingOrigin' })
  listingCollection = new Collection<Listing>(this);

}
