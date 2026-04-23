import { Entity, PrimaryKey } from '@mikro-orm/decorators/legacy';
import { PrimaryKeyProp } from '@mikro-orm/core';

@Entity()
export class SchemaMigrations {

  [PrimaryKeyProp]?: 'version';

  @PrimaryKey({ length: -1 })
  version!: string;

}
