import { Collection, type Opt, defineEntity, p } from '@mikro-orm/core';
import { Listing } from './Listing.js';

export class ReturnExchangeProfile {
  id!: number;
  profileName!: string;
  returnWindowDays: number & Opt = 30;
  additionalDetails?: string;
  acceptReturns: boolean & Opt = false;
  acceptExchanges: boolean & Opt = false;
  createdAt?: Date;
  updatedAt?: Date;
  standardProfileKey?: string;
  listingCollection = new Collection<Listing>(this);
}

export const ReturnExchangeProfileSchema = defineEntity({
  class: ReturnExchangeProfile,
  properties: {
    id: p.integer().primary(),
    profileName: p.string().length(128),
    returnWindowDays: p.integer(),
    additionalDetails: p.text().nullable(),
    acceptReturns: p.boolean(),
    acceptExchanges: p.boolean(),
    createdAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    updatedAt: p.datetime().nullable().defaultRaw(`CURRENT_TIMESTAMP`),
    standardProfileKey: p.string().length(64).nullable().unique('unique_standard_profile_key'),
    listingCollection: () => p.oneToMany(Listing).mappedBy('returnExchangeProfile'),
  },
});
