import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

@Entity()
export class ServerErrorLog {

  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true })
  statusCode?: number;

  @Property({ length: 10, nullable: true })
  method?: string;

  @Property({ type: 'text', nullable: true })
  path?: string;

  @Property({ type: 'text', nullable: true })
  message?: string;

  @Property({ type: 'text', nullable: true })
  stack?: string;

  @Property({ type: 'json', nullable: true })
  requestBody?: any;

  @Property({ type: 'json', nullable: true })
  requestQuery?: any;

  @Property({ type: 'text', nullable: true })
  userEmail?: string;

  @Property({ type: 'text', nullable: true })
  ipAddress?: string;

  @Property({ type: 'text', nullable: true })
  userAgent?: string;

}
