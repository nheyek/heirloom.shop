import { Collection, Entity, OneToMany, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Listing } from './Listing';
import { Shop } from './Shop';

@Entity()
export class Country {

  [PrimaryKeyProp]?: 'code';

  @PrimaryKey({ type: 'character', length: 2 })
  code!: string;

  @Property({ length: 128 })
  name!: string;

  @OneToMany({ entity: () => Listing, mappedBy: 'country' })
  listingCollection = new Collection<Listing>(this);

  @OneToMany({ entity: () => Shop, mappedBy: 'country' })
  shopCollection = new Collection<Shop>(this);

}
