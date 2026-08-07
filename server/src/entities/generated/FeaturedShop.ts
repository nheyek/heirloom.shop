import { type Rel } from '@mikro-orm/core';
import { Entity, OneToOne, PrimaryKey } from '@mikro-orm/decorators/es';
import { Shop } from './Shop.js';

@Entity()
export class FeaturedShop {

  @PrimaryKey()
  id!: number;

  @OneToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade', unique: 'featured_shop_shop_id_key' })
  shop!: Rel<Shop>;

}
