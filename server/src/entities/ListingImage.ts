import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Listing } from './Listing';

@Entity()
export class ListingImage {

  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Listing, deleteRule: 'cascade' })
  listing!: Listing;

  @Property({ length: 36 })
  imageUuid!: string;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ columnType: 'timestamp(6)', nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

}
