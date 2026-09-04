import {
	Box,
	Flex,
	HStack,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { InfoPageDialog } from '@client/components/richText/InfoPageDialog';
import { CLIENT_ROUTES, InfoPageKey } from '@client/constants';
import { displayFontFamily } from '@client/theme';
import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const hideFooterPages = [CLIENT_ROUTES.checkout];
const SUPPORT_EMAIL = 'support@heirloom.shop';
const SUPPORT_PHONE = '(312) 617-6523';
const SUPPORT_PHONE_TEL = '+13126176523';

const FOOTER_INFO_LINKS = [
	{
		label: 'Shipping & Returns',
		key: InfoPageKey.SHIPPING_RETURNS,
	},
	{ label: 'Privacy Policy', key: InfoPageKey.PRIVACY },
	{ label: 'Terms of Service', key: InfoPageKey.TERMS_OF_SERVICE },
];

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
		<Box
			width="100%"
			background="brand"
			color="#FFF"
			flexShrink={0}
			px={{ base: 6, md: 10 }}
			py={10}
			fontSize={18}
		>
			<Flex
				wrap="wrap"
				gap={10}
				justifyContent="space-between"
				maxW={1000}
				mx="auto"
			>
				<Stack
					gap={0}
					minW={180}
					alignItems="center"
				>
					<Box width={160}>
						<Logo />
					</Box>
					<Text
						fontFamily={displayFontFamily}
						fontSize={22}
					>
						2026 • Chicago, IL
					</Text>
				</Stack>

				<Stack
					gap={2}
					minW={200}
				>
					<Text
						fontSize={24}
						fontWeight={600}
						fontFamily={displayFontFamily}
					>
						Contact
					</Text>
					<Stack gap={1}>
						<HStack gap={2}>
							<FaEnvelope />
							<Link
								href={`mailto:${SUPPORT_EMAIL}`}
								color="#FFF"
							>
								{SUPPORT_EMAIL}
							</Link>
						</HStack>
						<HStack gap={2}>
							<FaPhoneAlt />
							<Link
								href={`tel:${SUPPORT_PHONE_TEL}`}
								color="#FFF"
							>
								{SUPPORT_PHONE}
							</Link>
						</HStack>
					</Stack>
				</Stack>

				<Stack
					gap={2}
					minW={200}
				>
					<Text
						fontSize={24}
						fontWeight={600}
						fontFamily={displayFontFamily}
					>
						Info
					</Text>
					<Stack gap={0}>
						{FOOTER_INFO_LINKS.map(({ label, key }) => (
							<Link
								key={key}
								color="#FFF"
								cursor="pointer"
								onClick={() => setOpenInfoPage(key)}
							>
								{label}
							</Link>
						))}
					</Stack>
				</Stack>
			</Flex>

			{openInfoPage && (
				<InfoPageDialog
					infoPageKey={openInfoPage}
					open
					onClose={() => setOpenInfoPage(null)}
				/>
			)}
		</Box>
	);
};
