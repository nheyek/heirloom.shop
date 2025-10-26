import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class AppUser {

  @PrimaryKey()
  id!: number;

  @Property({ length: 64, unique: 'unique_username' })
  username!: string;

  @Property({ length: 128 })
  email!: string;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
