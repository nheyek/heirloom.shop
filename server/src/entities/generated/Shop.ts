import { Collection, type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Country } from './Country.js';
import { FeaturedShop } from './FeaturedShop.js';
import { Listing } from './Listing.js';
import { ListingPersonalizationProfile } from './ListingPersonalizationProfile.js';
import { ListingProcessingProfile } from './ListingProcessingProfile.js';
import { ListingReturnProfile } from './ListingReturnProfile.js';
import { ListingShippingProfile } from './ListingShippingProfile.js';
import { ShopUserRole } from './ShopUserRole.js';
import { UserFavoriteShop } from './UserFavoriteShop.js';

@Entity()
export class Shop {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128, unique: 'shop_title_key' })
  title!: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

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

  @Property({ length: 10, index: 'idx_shop_short_id', unique: 'shop_short_id_key' })
  shortId!: string;

  @Property({ type: 'boolean' })
  directFulfillment: boolean & Opt = true;

  @OneToOne({ entity: () => FeaturedShop, mappedBy: 'shop' })
  featuredShop?: Rel<FeaturedShop>;

  @OneToMany({ entity: () => Listing, mappedBy: 'shop' })
  listingCollection = new Collection<Listing>(this);

  @OneToMany({ entity: () => ListingPersonalizationProfile, mappedBy: 'shop' })
  listingPersonalizationProfileCollection = new Collection<ListingPersonalizationProfile>(this);

  @OneToMany({ entity: () => ListingProcessingProfile, mappedBy: 'shop' })
  listingProcessingProfileCollection = new Collection<ListingProcessingProfile>(this);

  @OneToMany({ entity: () => ListingReturnProfile, mappedBy: 'shop' })
  listingReturnProfileCollection = new Collection<ListingReturnProfile>(this);

  @OneToMany({ entity: () => ListingShippingProfile, mappedBy: 'shop' })
  listingShippingProfileCollection = new Collection<ListingShippingProfile>(this);

  @OneToMany({ entity: () => ShopUserRole, mappedBy: 'shop' })
  shopUserRoleCollection = new Collection<ShopUserRole>(this);

  @OneToMany({ entity: () => UserFavoriteShop, mappedBy: 'shop' })
  userFavoriteShopCollection = new Collection<UserFavoriteShop>(this);

}
