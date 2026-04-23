import { Collection } from '@mikro-orm/core';
import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { Listing } from './Listing';

@Entity()
export class ListingCategory {

  @PrimaryKey({ length: 64 })
  id!: string;

  @Property({ length: 128 })
  title!: string;

  @Property({ length: 256, nullable: true })
  subtitle?: string;

  @Property({ length: 36, nullable: true })
  imageUuid?: string;

  @ManyToOne({ entity: () => ListingCategory, updateRule: 'no action', nullable: true })
  parent?: ListingCategory;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  updatedAt?: Date;

  @OneToMany({ entity: () => Listing, mappedBy: 'category' })
  listingCollection = new Collection<Listing>(this);

  @OneToMany({ entity: () => ListingCategory, mappedBy: 'parent' })
  listingCategoryCollection = new Collection<ListingCategory>(this);

}
