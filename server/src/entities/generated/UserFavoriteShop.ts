import { type Opt, type Rel } from '@mikro-orm/core';
import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/decorators/es';
import { AppUser } from './AppUser.js';
import { Shop } from './Shop.js';

@Entity()
@Unique({ name: 'user_favorite_shop_user_id_shop_id_key', properties: ['user', 'shop'] })
export class UserFavoriteShop {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AppUser, updateRule: 'no action', deleteRule: 'cascade', index: 'user_favorite_shop_user_id_idx' })
  user!: Rel<AppUser>;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Rel<Shop>;

  @Property({ type: 'datetime', defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date & Opt;

}
