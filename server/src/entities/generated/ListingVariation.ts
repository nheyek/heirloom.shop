import { Collection, type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/decorators/es';
import { Listing } from './Listing.js';
import { ListingVariationOption } from './ListingVariationOption.js';

@Entity()
@Unique({ name: 'unique_name_per_listing', properties: ['listing', 'variationName'] })
export class ListingVariation {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Listing, updateRule: 'no action', deleteRule: 'cascade' })
  listing!: Rel<Listing>;

  @Property({ length: 128 })
  variationName!: string;

  @Property({ type: 'boolean' })
  pricesVary: boolean & Opt = false;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @OneToMany({ entity: () => ListingVariationOption, mappedBy: 'listingVariation' })
  listingVariationOptionCollection = new Collection<ListingVariationOption>(this);

}
