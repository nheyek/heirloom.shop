import { Entity, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';

@Entity()
export class Country {

  [PrimaryKeyProp]?: 'code';

  @PrimaryKey({ type: 'character', length: 2 })
  code!: string;

  @Property({ length: 128 })
  name!: string;

}
