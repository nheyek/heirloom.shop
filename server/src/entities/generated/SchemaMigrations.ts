import { Entity, PrimaryKey, PrimaryKeyProp } from '@mikro-orm/core';

@Entity()
export class SchemaMigrations {

  [PrimaryKeyProp]?: 'version';

  @PrimaryKey({ length: -1 })
  version!: string;

}
