import { type Opt } from '@mikro-orm/core';
import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/decorators/es';
import { ListingVariation } from './ListingVariation';

@Entity()
@Unique({ name: 'unique_option_per_variation', properties: ['listingVariation', 'optionName'] })
export class ListingVariationOption {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => ListingVariation, updateRule: 'no action', deleteRule: 'cascade' })
  listingVariation!: ListingVariation;

  @Property({ length: 128 })
  optionName!: string;

  @Property({ type: 'integer' })
  additionalPriceCents: number & Opt = 0;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
