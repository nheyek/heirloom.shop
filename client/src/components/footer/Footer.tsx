import {
	Box,
	Flex,
	HStack,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { Logo } from '@client/components/branding/Logo';
import { CLIENT_ROUTES } from '@client/constants';
import { displayFontFamily } from '@client/theme';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const hideFooterPages = [CLIENT_ROUTES.checkout];
const SUPPORT_EMAIL = 'support@heirloom.shop';
const SUPPORT_PHONE = '(312) 617-6523';
const SUPPORT_PHONE_TEL = '+13126176523';

export const Footer = () => {
	const { pathname } = useLocation();

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
					<Box width={180}>
						<Logo />
					</Box>
					<Text
						fontFamily={displayFontFamily}
						fontSize={24}
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
						<Link color="#FFF">Shipping & Returns</Link>
						<Link color="#FFF">Privacy Policy</Link>
						<Link color="#FFF">Terms of Service</Link>
					</Stack>
				</Stack>
			</Flex>
		</Box>
	);
};
