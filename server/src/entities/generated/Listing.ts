import { Collection, type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { ListingCategory } from './ListingCategory.js';
import { ListingProcessingProfile } from './ListingProcessingProfile.js';
import { ListingReturnProfile } from './ListingReturnProfile.js';
import { ListingShippingProfile } from './ListingShippingProfile.js';
import { Shop } from './Shop.js';
import { UserFavoriteListing } from './UserFavoriteListing.js';

@Entity()
export class Listing {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  title!: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @ManyToOne({ entity: () => ListingCategory, updateRule: 'no action', deleteRule: 'restrict' })
  category!: Rel<ListingCategory>;

  @Property({ length: 256, nullable: true })
  subtitle?: string;

  @Property({ type: 'integer' })
  priceCents: number & Opt = 0;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @Property({ type: 'string[]', defaultRaw: `ARRAY[]::text[]` })
  imageUuids!: string[] & Opt;

  @ManyToOne({ entity: () => ListingShippingProfile, updateRule: 'no action', nullable: true })
  shippingProfile?: Rel<ListingShippingProfile>;

  @Property({ type: 'json', nullable: true })
  fullDescr?: any;

  @Property({ length: 10, index: 'idx_listing_short_id', unique: 'listing_short_id_key' })
  shortId!: string;

  @ManyToOne({ entity: () => ListingProcessingProfile, updateRule: 'no action', nullable: true })
  processingProfile?: Rel<ListingProcessingProfile>;

  @ManyToOne({ entity: () => ListingReturnProfile, updateRule: 'no action', nullable: true })
  returnProfile?: Rel<ListingReturnProfile>;

  @Property({ length: 12, nullable: true })
  upc?: string;

  @Property({ type: 'json', nullable: true })
  variations?: any;

  @Property({ type: 'json', nullable: true })
  combinations?: any;

  @Property({ type: 'boolean' })
  available: boolean & Opt = false;

  @OneToMany({ entity: () => UserFavoriteListing, mappedBy: 'listing' })
  userFavoriteListingCollection = new Collection<UserFavoriteListing>(this);

}
