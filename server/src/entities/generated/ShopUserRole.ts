import { type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { AppUser } from './AppUser.js';
import { Shop } from './Shop.js';

@Entity()
export class ShopUserRole {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @ManyToOne({ entity: () => AppUser, updateRule: 'no action', deleteRule: 'cascade' })
  user!: Rel<AppUser>;

  @Property({ length: 32 })
  shopRole!: string;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt!: Date & Opt;

}
