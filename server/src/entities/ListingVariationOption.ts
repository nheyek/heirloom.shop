import { Entity, ManyToOne, type Opt, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ListingVariation } from './ListingVariation';

@Entity()
@Unique({ name: 'unique_option_per_variation', properties: ['listingVariation', 'optionName'] })
export class ListingVariationOption {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => ListingVariation, deleteRule: 'cascade' })
  listingVariation!: ListingVariation;

  @Property({ length: 128 })
  optionName!: string;

  @Property({ type: 'decimal', precision: 6, scale: 2, defaultRaw: `0.00` })
  additionalPriceUsDollars!: string & Opt;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
