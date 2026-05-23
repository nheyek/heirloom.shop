import { Collection, type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Country } from './Country.js';
import { Listing } from './Listing.js';
import { ShippingOrigin } from './ShippingOrigin.js';
import { ShippingProfile } from './ShippingProfile.js';
import { ShopUserRole } from './ShopUserRole.js';

@Entity()
export class Shop {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128, unique: 'shop_title_key' })
  title!: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property({ type: 'text', nullable: true })
  profileRichText?: string;

  @Property({ length: 36, nullable: true })
  profileImageUuid?: string;

  @Property({ length: 64, nullable: true })
  shopLocation?: string;

  @Property({ length: 32, nullable: true })
  classification?: string;

  @ManyToOne({ entity: () => Country, updateRule: 'no action', nullable: true })
  country?: Rel<Country>;

  @Property({ length: 64, nullable: true })
  categoryIcon?: string;

  @Property({ length: 10, nullable: true, index: 'idx_shop_short_id', unique: 'shop_short_id_key' })
  shortId?: string;

  @Property({ type: 'boolean' })
  directFulfillment: boolean & Opt = true;

  @OneToMany({ entity: () => Listing, mappedBy: 'shop' })
  listingCollection = new Collection<Listing>(this);

  @OneToMany({ entity: () => ShippingOrigin, mappedBy: 'shop' })
  shippingOriginCollection = new Collection<ShippingOrigin>(this);

  @OneToMany({ entity: () => ShippingProfile, mappedBy: 'shop' })
  shippingProfileCollection = new Collection<ShippingProfile>(this);

  @OneToMany({ entity: () => ShopUserRole, mappedBy: 'shop' })
  shopUserRoleCollection = new Collection<ShopUserRole>(this);

}
