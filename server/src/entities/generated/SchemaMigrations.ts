import { PrimaryKeyProp } from '@mikro-orm/core';
import { Entity, PrimaryKey } from '@mikro-orm/decorators/es';

@Entity()
export class SchemaMigrations {

  [PrimaryKeyProp]?: 'version';

  @PrimaryKey({ length: -1 })
  version!: string;

}
