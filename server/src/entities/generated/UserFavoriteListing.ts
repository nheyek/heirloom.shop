import {
	Entity,
	ManyToOne,
	PrimaryKey,
	Property,
	Unique,
} from '@mikro-orm/decorators/legacy';
import { AppUser } from './AppUser';
import { Listing } from './Listing';

@Entity()
@Unique({ name: 'user_favorite_listing_user_id_listing_id_key', properties: ['user', 'listing'] })
export class UserFavoriteListing {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AppUser, deleteRule: 'cascade', index: 'idx_user_favorite_listing_user_id' })
  user!: AppUser;

  @ManyToOne({ entity: () => Listing, deleteRule: 'cascade', index: 'idx_user_favorite_listing_listing_id' })
  listing!: Listing;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

}
