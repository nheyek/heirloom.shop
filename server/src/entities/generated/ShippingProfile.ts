import {
	Collection,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { Listing } from './Listing';
import { Shop } from './Shop';

@Entity()
export class ShippingProfile {
	@PrimaryKey()
	id!: number;

	@Property({ length: 128 })
	profileName!: string;

	@Property({
		type: 'decimal',
		precision: 6,
		scale: 2,
		nullable: true,
	})
	flatShippingRateUsDollars?: string;

	@Property({ nullable: true })
	shippingDaysMin?: number;

	@Property({ nullable: true })
	shippingDaysMax?: number;

	@Property({
		columnType: 'timestamp(6)',
		nullable: true,
		defaultRaw: `CURRENT_TIMESTAMP`,
	})
	createdAt?: Date;

	@Property({
		columnType: 'timestamp(6)',
		nullable: true,
		defaultRaw: `CURRENT_TIMESTAMP`,
	})
	updatedAt?: Date;

	@ManyToOne({
		entity: () => Shop,
		deleteRule: 'cascade',
		nullable: true,
	})
	shop?: Shop;

	@Property({
		length: 64,
		nullable: true,
		unique: 'unique_shop_standard_profile_key',
	})
	standardProfileKey?: string;

	@OneToMany({
		entity: () => Listing,
		mappedBy: 'shippingProfile',
	})
	listingCollection = new Collection<Listing>(this);
}
