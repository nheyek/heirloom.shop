import { type Opt, PrimaryKeyProp } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

@Entity()
export class InfoPage {

  [PrimaryKeyProp]?: 'key';

  @PrimaryKey({ length: 64 })
  key!: string;

  @Property({ type: 'text' })
  contentHtml!: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

}
