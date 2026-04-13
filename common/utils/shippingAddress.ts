import { ShippingAddress } from '@common/contract';

export const formatShippingAddress = (address: ShippingAddress): string => {
	const lines = [
		`${address.firstName} ${address.lastName}`,
		address.line1,
	];
	if (address.line2) lines.push(address.line2);
	lines.push(`${address.city}, ${address.state} ${address.zip}`);
	return lines.join('\n');
};
