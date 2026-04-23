import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { AppUser } from './AppUser';
import { Shop } from './Shop';

@Entity()
export class ShopUserRole {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Shop, updateRule: 'no action', deleteRule: 'cascade' })
  shop!: Shop;

  @ManyToOne({ entity: () => AppUser, updateRule: 'no action', deleteRule: 'cascade' })
  user!: AppUser;

  @Property({ length: 32 })
  shopRole!: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
