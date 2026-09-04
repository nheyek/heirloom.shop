import { InfoPageKey } from '@client/constants';

type InfoPageContent = {
	title: string;
	contentHtml: string;
};

export const INFO_PAGES: Record<InfoPageKey, InfoPageContent> = {
	[InfoPageKey.ABOUT]: {
		title: 'About Heirloom',
		contentHtml:
			'<p>Heirloom is an online store and marketplace featuring a range of products from makers that exhibit the highest level of craftsmanship.</p><p />' +
			'<h1>Background</h1>' +
			'<p>Throw-away culture is, sadly, a defining feature of the present historical moment.</p>' +
			"<p>But disillusionment is growing. People are beginning to ask questions about where their products come from and how they're made.</p><p />" +
			'<h1>The Idea</h1>' +
			'<p>It\'s often said that "they don\'t make them like they used to". But while "they" may not, there are others that do. They are just often hard to find.</p>' +
			'<p>Heirloom seeks to make it easy to discover these makers and purchase their work.</p><p />' +
			'<h1>The Experience</h1>' +
			'<p>The site is designed to prioritize authentic discovery and simplicity over maximizing sales. We will not send you unsolicited emails. We will never serve you ads or promoted content.</p>' +
			'<p>Orders are professionally packed and shipped within 1 business day. All orders ship free and are guaranteed against damage in transit.</p>' +
			"<p>If, for any reason, what you received doesn't meet your expectations, we'll take it back for a full refund within 30 days.</p><p />" +
			'<h1>Who We Are</h1>' +
			'<p>Heirloom was founded and developed by Nick Heyek, a Chicago-based software engineer and manufacturer.</p>' +
			"<p>Our facility is located at 3100 W Grand Ave in Chicago's Humboldt Park neighborhood.</p><p />" +
			'<h1>Get in Touch</h1>' +
			'<p>For questions, feedback, or any other reason, reach us at support@heirloom.shop.</p>',
	},
	[InfoPageKey.SHIPPING_RETURNS]: {
		title: 'Shipping & Returns',
		contentHtml:
			'<p>All orders ship free and are professionally packed and shipped within 1 business day. Every order is guaranteed against damage in transit.</p><p />' +
			'<h1>Returns</h1>' +
			'<ul><li>A free return label will be sent to you via email upon initiation of a return.</li><li>A refund will be issued to your original payment method within 7 days of receipt of the returned items.</li><li>Returned items must be in their original condition and packaging.</li><li>Returns must be initiated within 30 days of delivery.</li></ul>' +
			'<p>To start a return, visit your order page and contact us at support@heirloom.shop with your order number.</p>',
	},
	[InfoPageKey.PRIVACY]: {
		title: 'Privacy Policy',
		contentHtml:
			'<p>This Privacy Policy explains how Heirloom ("we", "us") collects, uses, and protects your information when you use heirloom.shop.</p><p />' +
			'<h1>Information We Collect</h1>' +
			'<p>When you place an order, we collect your name, email address, shipping address, and payment information. Payment information is processed securely by Stripe and is never stored on our servers.</p><p />' +
			'<h1>How We Use Your Information</h1>' +
			'<p>We use your information solely to process and fulfill your orders, communicate with you about your purchases, and provide customer support. We do not sell or share your personal information with third parties for marketing purposes.</p><p />' +
			'<h1>Cookies</h1>' +
			'<p>We use minimal, necessary cookies to keep you signed in and remember your shopping cart. We do not use tracking or advertising cookies.</p><p />' +
			'<h1>Contact Us</h1>' +
			'<p>If you have any questions about this Privacy Policy or your personal information, please contact us at support@heirloom.shop.</p>',
	},
	[InfoPageKey.TERMS_OF_SERVICE]: {
		title: 'Terms of Service',
		contentHtml:
			'<p>These Terms of Service govern your use of heirloom.shop. By placing an order or using this site, you agree to these terms.</p><p />' +
			'<h1>Products &amp; Makers</h1>' +
			'<p>Heirloom is a marketplace featuring products from independent makers. Product descriptions, availability, and pricing are subject to change without notice.</p><p />' +
			'<h1>Orders &amp; Payment</h1>' +
			'<p>All orders are subject to acceptance and availability. Payment is processed at the time of purchase.</p><p />' +
			'<h1>Shipping &amp; Returns</h1>' +
			'<p>Please see our Shipping &amp; Returns page for details on delivery and our return policy.</p><p />' +
			'<h1>Limitation of Liability</h1>' +
			'<p>Heirloom is not liable for any indirect, incidental, or consequential damages arising from your use of this site or its products.</p><p />' +
			'<h1>Governing Law</h1>' +
			'<p>These terms are governed by the laws of the State of Illinois, USA.</p><p />' +
			'<h1>Contact Us</h1>' +
			'<p>Questions about these terms can be directed to support@heirloom.shop.</p>',
	},
};
