import { Collection, type Opt, type Rel, defineEntity, p } from '@mikro-orm/core';
import { Listing } from './Listing.js';
import { ListingVariationOption } from './ListingVariationOption.js';

export class ListingVariation {
  id!: number;
  listing!: Rel<Listing>;
  variationName!: string;
  pricesVary: boolean & Opt = false;
  createdAt?: Date;
  updatedAt?: Date;
  listingVariationOptionCollection = new Collection<ListingVariationOption>(this);
}

export const ListingVariationSchema = defineEntity({
  class: ListingVariation,
  uniques: [
    { name: 'unique_name_per_listing', properties: ['listing', 'variationName'] },
  ],
  properties: {
    id: p.integer().primary(),
    listing: () => p.manyToOne(Listing).updateRule('no action').deleteRule('cascade'),
    variationName: p.string().length(128),
    pricesVary: p.boolean(),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    listingVariationOptionCollection: () => p.oneToMany(ListingVariationOption).mappedBy('listingVariation'),
  },
});
