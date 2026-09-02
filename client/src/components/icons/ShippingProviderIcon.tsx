import { ShippingProvider } from '@heirloom/common/constants';
import { IconType } from 'react-icons';
import { SiDhl, SiFedex, SiUps, SiUsps } from 'react-icons/si';

const SHIPPING_PROVIDER_ICONS: Record<ShippingProvider, IconType> = {
	[ShippingProvider.UPS]: SiUps,
	[ShippingProvider.FEDEX]: SiFedex,
	[ShippingProvider.USPS]: SiUsps,
	[ShippingProvider.DHL]: SiDhl,
};

export const ShippingProviderIcon = ({
	provider,
	size = 20,
}: {
	provider: ShippingProvider;
	size?: number;
}) => {
	const Icon = SHIPPING_PROVIDER_ICONS[provider];
	return <Icon size={size} />;
};
