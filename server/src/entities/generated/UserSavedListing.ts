import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { AppUser } from './AppUser';
import { Listing } from './Listing';

@Entity()
@Unique({ name: 'user_saved_listing_user_id_listing_id_key', properties: ['user', 'listing'] })
export class UserSavedListing {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AppUser, deleteRule: 'cascade', index: 'idx_user_saved_listing_user_id' })
  user!: AppUser;

  @ManyToOne({ entity: () => Listing, deleteRule: 'cascade', index: 'idx_user_saved_listing_listing_id' })
  listing!: Listing;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

}
