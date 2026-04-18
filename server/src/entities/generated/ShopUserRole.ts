import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { AppUser } from './AppUser';
import { Shop } from './Shop';

@Entity()
export class ShopUserRole {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Shop, deleteRule: 'cascade' })
  shop!: Shop;

  @ManyToOne({ entity: () => AppUser, deleteRule: 'cascade' })
  user!: AppUser;

  @Property({ length: 32 })
  shopRole!: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
