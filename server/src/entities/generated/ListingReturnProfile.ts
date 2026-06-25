import { Collection, type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Listing } from './Listing.js';
import { Shop } from './Shop.js';

@Entity()
export class ListingReturnProfile {

  @PrimaryKey()
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @Property({ type: 'smallint', nullable: true })
  returnWindowDays?: number;

  @Property({ type: 'text', nullable: true })
  policyDescrRichText?: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property({ type: 'string', length: 16 })
  policyType: string & Opt = 'standard';

  @OneToMany({ entity: () => Listing, mappedBy: 'returnProfile' })
  listingCollection = new Collection<Listing>(this);

}
