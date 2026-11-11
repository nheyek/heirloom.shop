import {
	Box,
	HStack,
	Link,
	LinkProps,
	Stack,
	Wrap,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { InfoPageDialog } from '@client/components/richText/InfoPageDialog';
import { SingleLineText } from '@client/components/textDisplay/SingleLineText';
import { CLIENT_ROUTES, InfoPageKey } from '@client/constants';
import { DISPLAY_FONT_FAMILY } from '@client/theme';
import { ReactNode, useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const hideFooterPages = [CLIENT_ROUTES.checkout];
const FOOTER_GAP = 2.5;
const FOOTER_SECTION_MIN_WIDTH = 200;
const FOOTER_LINK_COLOR = '#FFF';

const CONTACT_ITEMS = [
	{
		icon: <FaEnvelope />,
		label: 'support@heirloom.shop',
		href: 'mailto:support@heirloom.shop',
	},
	{
		icon: <FaPhoneAlt />,
		label: '(312) 617-6523',
		href: 'tel:+13126176523',
	},
];

const FOOTER_INFO_LINKS = [
	{
		label: 'Shipping & Returns',
		key: InfoPageKey.SHIPPING_RETURNS,
	},
	{ label: 'Privacy Policy', key: InfoPageKey.PRIVACY },
	{ label: 'Terms of Service', key: InfoPageKey.TERMS_OF_SERVICE },
];

const FooterLink = (props: LinkProps) => (
	<Link
		as={SingleLineText}
		color={FOOTER_LINK_COLOR}
		{...props}
	/>
);

const FooterSection = (props: {
	title: string;
	children: ReactNode;
}) => (
	<Stack
		gap={FOOTER_GAP}
		minW={FOOTER_SECTION_MIN_WIDTH}
	>
		<SingleLineText
			fontSize={24}
			fontWeight={600}
		>
			{props.title}
		</SingleLineText>
		{props.children}
	</Stack>
);

export const Footer = () => {
	const { pathname } = useLocation();
	const [openInfoPage, setOpenInfoPage] =
		useState<InfoPageKey | null>(null);

	const hideFooter = hideFooterPages
		.map((page) => `/${page}`)
		.includes(pathname);

	if (hideFooter) {
		return null;
	}

	return (
		<Stack
			width="100%"
			alignItems="center"
			background="brand"
			color="white"
			flexShrink={0}
			p={10}
			fontSize={18}
		>
			<Wrap
				gap={10}
				justifyContent="space-between"
				width="100%"
				maxW={1000}
			>
				<Stack
					gap={1}
					alignItems="center"
				>
					<Box width={160}>
						<Logo />
					</Box>
					<SingleLineText
						fontFamily={DISPLAY_FONT_FAMILY}
						fontSize={22}
					>
						2026 • Chicago, IL
					</SingleLineText>
				</Stack>

				<FooterSection title="Contact">
					{CONTACT_ITEMS.map(({ icon, label, href }) => (
						<HStack
							key={href}
							gap={FOOTER_GAP}
						>
							{icon}
							<FooterLink href={href}>
								{label}
							</FooterLink>
						</HStack>
					))}
				</FooterSection>

				<FooterSection title="Info">
					{FOOTER_INFO_LINKS.map(({ label, key }) => (
						<FooterLink
							key={key}
							cursor="pointer"
							onClick={() => setOpenInfoPage(key)}
						>
							{label}
						</FooterLink>
					))}
				</FooterSection>
			</Wrap>

			{openInfoPage && (
				<InfoPageDialog
					infoPageKey={openInfoPage}
					open
					onClose={() => setOpenInfoPage(null)}
				/>
			)}
		</Stack>
	);
};
