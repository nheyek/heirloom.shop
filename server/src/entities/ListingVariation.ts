import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { ListingVariation as ListingVariationGenerated } from './generated/ListingVariation';
import { ListingVariationOption } from './generated/ListingVariationOption';

@Entity({ tableName: 'listing_variation' })
export class ListingVariation extends ListingVariationGenerated {
	@OneToMany({ entity: () => ListingVariationOption, mappedBy: 'listingVariation' })
	options = new Collection<ListingVariationOption>(this);
}
