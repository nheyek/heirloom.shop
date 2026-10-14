import { InfoPageKey } from '@client/constants';

type InfoPageContent = {
	title: string;
	contentHtml: string;
};

export const INFO_PAGES: Record<InfoPageKey, InfoPageContent> = {
	[InfoPageKey.ABOUT]: {
		title: 'About Heirloom.shop',
		contentHtml:
			'<p>Heirloom.shop is an exclusive online marketplace for jewelry and accessories from makers that exhibit the highest level of craftsmanship.</p><p />' +
			'<h1>Background</h1>' +
			'<p>Modern e-commerce has facilitated a commercial renaissance in handcrafted goods. Centuries-old workshops have come back from the dead. Countless new makers have found life as direct-to-consumer businesses that would not have been possible in previous decades.</p>' +
			"<p>Because it's now so easy to sell things online, visibility has become increasingly restricted to the highest bidder on social media ads or promoted products on marketplaces. This threatens the kind of authentic discovery that the internet once enabled.</p>" +
			'<p>Heirloom seeks to offer that back to makers and their customers. Only genuinely handcrafted products are allowed on the platform, and visibility is driven entirely by relevance and reputation, not by promoted listings.</p><p />' +
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
			'<p>This privacy policy explains how Heirloom.shop LLC ("Heirloom", "we", "us") collects, uses, and protects your information when you use heirloom.shop.</p><p />' +
			'<h1>Information We Collect</h1>' +
			'<p>When you place an order, we collect your name, email address, shipping address, and payment information. Payment information is processed securely by Stripe and is never stored on our servers.</p><p />' +
			'<h1>How We Use Your Information</h1>' +
			'<p>We use your information solely to process and fulfill your orders, communicate with you about your purchases, and provide customer support. We do not sell or share your personal information with third parties for marketing purposes.</p><p />' +
			'<h1>Cookies</h1>' +
			"<p>Heirloom itself does not use cookies. Your session and shopping cart are kept in your browser's local storage instead.</p>" +
			'<p>Some of our service providers may set their own cookies as part of handling their part of your visit: Stripe, which processes payments, for fraud prevention, and Auth0, which handles account login, to maintain your login session. See their respective privacy policies for details.</p><p />' +
			'<h1>Contact Us</h1>' +
			'<p>If you have any questions about this privacy policy or your personal information, please contact us at support@heirloom.shop.</p>',
	},
	[InfoPageKey.TERMS_OF_SERVICE]: {
		title: 'Terms of Service',
		contentHtml:
			'<p>These Terms of Service govern your use of heirloom.shop, operated by Heirloom.shop LLC ("Heirloom", "we", "us"). By placing an order or using this site, you agree to these terms.</p><p />' +
			'<h1>Products and Makers</h1>' +
			'<p>Heirloom operates both as a retailer and as a marketplace. For some listings, Heirloom purchases and holds inventory directly from the maker and sells it to you as the seller of record. For other listings, Heirloom operates as a marketplace connecting you directly with the independent maker, who is the seller of record and fulfills the order themselves.</p>' +
			'<p>Product descriptions, availability, and pricing are subject to change without notice.</p><p />' +
			'<h1>Orders and Payment</h1>' +
			'<p>All orders are subject to acceptance and availability. Payment is processed at the time of purchase.</p><p />' +
			'<h1>Shipping and Returns</h1>' +
			'<p>Please see our Shipping &amp; Returns page for details on delivery and our return policy.</p><p />' +
			'<h1>Limitation of Liability</h1>' +
			'<p>Heirloom is not liable for any indirect, incidental, or consequential damages arising from your use of this site or its products. For marketplace listings fulfilled directly by a maker, that maker is solely responsible for the quality, safety, and accuracy of their products.</p><p />' +
			'<h1>Governing Law</h1>' +
			'<p>These terms are governed by the laws of the State of Illinois, USA.</p><p />' +
			'<h1>Contact Us</h1>' +
			'<p>Questions about these terms can be directed to support@heirloom.shop.</p>',
	},
};
