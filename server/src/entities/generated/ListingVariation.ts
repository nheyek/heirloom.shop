import { Collection, Entity, ManyToOne, OneToMany, type Opt, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Listing } from './Listing';
import { ListingVariationOption } from './ListingVariationOption';

@Entity()
@Unique({ name: 'unique_name_per_listing', properties: ['listing', 'variationName'] })
export class ListingVariation {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Listing, deleteRule: 'cascade' })
  listing!: Listing;

  @Property({ length: 128 })
  variationName!: string;

  @Property({ type: 'boolean' })
  pricesVary: boolean & Opt = false;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @OneToMany({ entity: () => ListingVariationOption, mappedBy: 'listingVariation' })
  listingVariationOptionCollection = new Collection<ListingVariationOption>(this);

}
