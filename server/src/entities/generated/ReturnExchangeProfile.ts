import {
	Entity,
	OneToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/decorators/legacy';
import { Collection, type Opt } from '@mikro-orm/core';
import { Listing } from './Listing';

@Entity()
export class ReturnExchangeProfile {

  @PrimaryKey()
  id!: number;

  @Property({ length: 128 })
  profileName!: string;

  @Property({ type: 'integer' })
  returnWindowDays: number & Opt = 30;

  @Property({ type: 'text', nullable: true })
  additionalDetails?: string;

  @Property({ type: 'boolean' })
  acceptReturns: boolean & Opt = false;

  @Property({ type: 'boolean' })
  acceptExchanges: boolean & Opt = false;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @Property({ length: 64, nullable: true, unique: 'unique_standard_profile_key' })
  standardProfileKey?: string;

  @OneToMany({ entity: () => Listing, mappedBy: 'returnExchangeProfile' })
  listingCollection = new Collection<Listing>(this);

}
