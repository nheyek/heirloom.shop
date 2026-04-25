import { ShippingAddress } from '@heirloom/common/contract';

export const getTaxTotal = (
	preTaxTotal: number,
	address: ShippingAddress,
) => {
	const illinoisSalesTaxRate = 0.0625; // TODO: Replace with Stripe sales tax calculation

	let taxTotal = 0;
	const zipCodeNumeric = Number(address.zip);
	if (zipCodeNumeric >= 60001 && zipCodeNumeric <= 62999) {
		taxTotal = Math.ceil(illinoisSalesTaxRate * preTaxTotal);
	}

	return taxTotal;
};
