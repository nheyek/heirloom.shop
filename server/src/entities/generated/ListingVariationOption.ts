import { type Opt, type Rel, defineEntity, p } from '@mikro-orm/core';
import { ListingVariation } from './ListingVariation.js';

export class ListingVariationOption {
  id!: number;
  listingVariation!: Rel<ListingVariation>;
  optionName!: string;
  additionalPriceCents: number & Opt = 0;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ListingVariationOptionSchema = defineEntity({
  class: ListingVariationOption,
  uniques: [
    {
      name: 'unique_option_per_variation',
      properties: ['listingVariation', 'optionName'],
    },
  ],
  properties: {
    id: p.integer().primary(),
    listingVariation: () => p.manyToOne(ListingVariation).updateRule('no action').deleteRule('cascade'),
    optionName: p.string().length(128),
    additionalPriceCents: p.integer(),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
  },
});
