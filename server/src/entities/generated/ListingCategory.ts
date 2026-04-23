import { Collection, type Rel, defineEntity, p } from '@mikro-orm/core';
import { Listing } from './Listing.js';

export class ListingCategory {
  id!: string;
  title!: string;
  subtitle?: string;
  imageUuid?: string;
  parent?: Rel<ListingCategory>;
  createdAt?: Date;
  updatedAt?: Date;
  listingCollection = new Collection<Listing>(this);
  listingCategoryCollection = new Collection<ListingCategory>(this);
}

export const ListingCategorySchema = defineEntity({
  class: ListingCategory,
  properties: {
    id: p.string().primary().length(64),
    title: p.string().length(128),
    subtitle: p.string().length(256).nullable(),
    imageUuid: p.string().length(36).nullable(),
    parent: () => p.manyToOne(ListingCategory).updateRule('no action').nullable(),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    listingCollection: () => p.oneToMany(Listing).mappedBy('category'),
    listingCategoryCollection: () => p.oneToMany(ListingCategory).mappedBy('parent'),
  },
});
