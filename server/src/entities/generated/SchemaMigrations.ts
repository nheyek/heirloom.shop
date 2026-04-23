import { PrimaryKeyProp, defineEntity, p } from '@mikro-orm/core';

export class SchemaMigrations {
  [PrimaryKeyProp]?: 'version';
  version!: string;
}

export const SchemaMigrationsSchema = defineEntity({
  class: SchemaMigrations,
  properties: {
    version: p.string().primary().length(-1),
  },
});
