import {
	Collection,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
} from '@mikro-orm/core';
import { Country } from './Country';
import { Listing } from './Listing';
import { ShippingOrigin } from './ShippingOrigin';
import { ShippingProfile } from './ShippingProfile';
import { ShopUserRole } from './ShopUserRole';

@Entity()
export class Shop {
	@PrimaryKey()
	id!: number;

	@Property({ length: 128 })
	title!: string;

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

	@Property({ type: 'text', nullable: true })
	profileRichText?: string;

	@Property({ length: 36, nullable: true })
	profileImageUuid?: string;

	@Property({ length: 64, nullable: true })
	shopLocation?: string;

	@Property({ length: 32, nullable: true })
	classification?: string;

	@ManyToOne({
		entity: () => Country,
		deleteRule: 'set null',
		nullable: true,
	})
	country?: Country;

	@Property({ length: 64, nullable: true })
	categoryIcon?: string;

	@Property({
		length: 10,
		nullable: true,
		index: 'idx_shop_short_id',
		unique: 'shop_short_id_key',
	})
	shortId?: string;

	@OneToMany({ entity: () => Listing, mappedBy: 'shop' })
	listingCollection = new Collection<Listing>(this);

	@OneToMany({
		entity: () => ShippingOrigin,
		mappedBy: 'shop',
	})
	shippingOriginCollection =
		new Collection<ShippingOrigin>(this);

	@OneToMany({
		entity: () => ShippingProfile,
		mappedBy: 'shop',
	})
	shippingProfileCollection =
		new Collection<ShippingProfile>(this);

	@OneToMany({
		entity: () => ShopUserRole,
		mappedBy: 'shop',
	})
	shopUserRoleCollection = new Collection<ShopUserRole>(
		this,
	);
}
