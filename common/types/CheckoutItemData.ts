export type CheckoutItemData = {
	listingShortId: string;
	selectedOptions: { [variationId: number]: number };
	quantity: number;
};
