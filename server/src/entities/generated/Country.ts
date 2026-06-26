import { Collection, PrimaryKeyProp } from '@mikro-orm/core';
import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Shop } from './Shop.js';

@Entity()
export class Country {

  [PrimaryKeyProp]?: 'code';

  @PrimaryKey({ type: 'character', length: 2 })
  code!: string;

  @Property({ length: 128 })
  name!: string;

  @OneToMany({ entity: () => Shop, mappedBy: 'country' })
  shopCollection = new Collection<Shop>(this);

}
