import { Collection, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Listing } from './Listing.js';
import { Shop } from './Shop.js';

@Entity()
export class ListingProcessingProfile {

  @PrimaryKey()
  id!: number;

  @Property({ length: 64 })
  name!: string;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @Property({ type: 'smallint' })
  minDays!: number;

  @Property({ type: 'smallint' })
  maxDays!: number;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @OneToMany({ entity: () => Listing, mappedBy: 'processingProfile' })
  listingCollection = new Collection<Listing>(this);

}
