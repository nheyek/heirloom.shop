import { Collection, PrimaryKeyProp, defineEntity, p } from '@mikro-orm/core';
import { Listing } from './Listing';
import { Shop } from './Shop';

export class Country {
  [PrimaryKeyProp]?: 'code';
  code!: string;
  name!: string;
  listingCollection = new Collection<Listing>(this);
  shopCollection = new Collection<Shop>(this);
}

export const CountrySchema = defineEntity({
  class: Country,
  properties: {
    code: p.character().primary().length(2),
    name: p.string().length(128),
    listingCollection: () => p.oneToMany(Listing).mappedBy('country'),
    shopCollection: () => p.oneToMany(Shop).mappedBy('country'),
  },
});
