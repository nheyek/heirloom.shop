import { InfoPageKey } from '@client/constants';

type InfoPageContent = {
	title: string;
	contentHtml: string;
};

export const INFO_PAGES: Record<InfoPageKey, InfoPageContent> = {
	[InfoPageKey.ABOUT]: {
		title: 'About Heirloom.shop',
		contentHtml:
			'<p>Heirloom.shop is an online marketplace for jewelry and accessories from makers that exhibit the highest level of craftsmanship.</p><p />' +
			'<h1>Background</h1>' +
			'<p>The internet has facilitated a commercial renaissance in handcrafted goods. Centuries-old workshops have found new life, and countless new makers have emerged as direct-to-consumer businesses that would not have been possible in previous decades.</p>' +
			"<p>At the same time, it's become very crowded, and visibility must now be paid for. When a customer looks for a product, they are directed not to the best maker, but to the highest bidder.</p><p />" +
			'<h1>The Idea</h1>' +
			'<p>Heirloom is a marketplace that seeks to re-introduce the kind of authentic discovery that has been lost from the modern web in recent years.</p>' +
			'<p>Makers on the platform are included on an invite-only basis and are carefully vetted. Listing visibility is determined solely by relevance to search/filter criteria.</p><p />' +
			'<h1>How It Works</h1>' +
			'<p>Makers operate their own shops on Heirloom, and are individually responsible for fulfilling orders and handling any customer service requests. Each has their own policies for shipping, returns, etc., which are outlined on every listing page.</p>' +
			'<p>Heirloom handles all payments, and guarantees customers that they receive what they order within the expected fulfillment window.</p><p />' +
			'<h1>Who We Are</h1>' +
			'<p>Heirloom was founded and developed by Nick Heyek, a Chicago-based software engineer and manufacturer.</p>' +
			"<p>Our facility is located at 3100 W Grand Ave in Chicago's Humboldt Park neighborhood.</p><p />" +
			'<h1>Get in Touch</h1>' +
			'<p>For questions, feedback, or any other reason, reach us at support@heirloom.shop.</p>',
	},
	[InfoPageKey.SHIPPING_RETURNS]: {
		title: 'Shipping & Returns',
		contentHtml:
			'<p>Every item on Heirloom is made and shipped by the maker who created it. Each maker sets their own shipping and return policies, which are outlined on every listing page.</p><p />' +
			'<h1>Shipping</h1>' +
			'<p>Makers are responsible for fulfilling their own orders. Processing time, shipping cost, and estimated delivery are shown on the listing page before you buy. If your order includes items from more than one maker, it may arrive in separate shipments.</p><p />' +
			'<h1>Returns</h1>' +
			'<p>Whether an item can be returned, the return window, and who pays for return shipping are determined by the maker and listed on each listing page. Please review them before you buy.</p>' +
			'<p>To start a return, or for any other question about your order, contact the maker directly. Their email address is shown on your order page and in your order confirmation email.</p><p />' +
			'<h1>Our Guarantee</h1>' +
			'<p>Heirloom handles all payments and guarantees that you will receive what you order within the expected fulfillment window. If something goes wrong with an order, start by contacting the maker. If it is not resolved, reach out to support@heirloom.shop and we will help.</p>',
	},
	[InfoPageKey.PRIVACY]: {
		title: 'Privacy Policy',
		contentHtml:
			'<p>This privacy policy explains how Heirloom.shop LLC ("Heirloom", "we", "us") collects, uses, and protects your information when you use heirloom.shop.</p><p />' +
			'<h1>Information We Collect</h1>' +
			'<p>When you place an order, we collect your name, email address, shipping address, and payment information. Heirloom handles all payments. Payment information is processed securely by Stripe and is never stored on our servers.</p><p />' +
			'<h1>How We Use Your Information</h1>' +
			'<p>We use your information solely to process and fulfill your orders, communicate with you about your purchases, and provide customer support. We do not sell your personal information or share it with third parties for marketing purposes.</p><p />' +
			'<h1>Sharing With Makers</h1>' +
			'<p>Heirloom is a marketplace, and each order is fulfilled by the independent maker who created the item. To fulfill your order, we share the information the maker needs with them: your name, shipping address, email address, and the details of your order. Makers are provided this information only for fulfilling your order and providing customer service for it. Payment information is never shared with makers.</p>' +
			'<p>Makers are independent businesses, and how they handle your information once they receive it is their own responsibility.</p><p />' +
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
			'<p>Heirloom is a marketplace. Makers operate their own shops on Heirloom and are independent businesses, individually responsible for the quality, safety, and accuracy of their products, for fulfilling orders, and for handling customer service requests. Each maker sets their own shipping, return, and other policies, which are outlined on every listing page.</p>' +
			'<p>Product descriptions, availability, and pricing are set by makers and are subject to change without notice.</p><p />' +
			'<h1>Orders and Payment</h1>' +
			'<p>All orders are subject to acceptance and availability. Heirloom handles all payments, which are processed at the time of purchase, and guarantees that you will receive what you order within the expected fulfillment window.</p><p />' +
			'<h1>Shipping and Returns</h1>' +
			'<p>Shipping and return policies are set by each maker and are outlined on every listing page. Please see our Shipping &amp; Returns page for more information.</p><p />' +
			'<h1>Limitation of Liability</h1>' +
			'<p>Heirloom is not liable for any indirect, incidental, or consequential damages arising from your use of this site or its products. Each maker is solely responsible for the quality, safety, and accuracy of their products.</p><p />' +
			'<h1>Governing Law</h1>' +
			'<p>These terms are governed by the laws of the State of Illinois, USA.</p><p />' +
			'<h1>Contact Us</h1>' +
			'<p>Questions about these terms can be directed to support@heirloom.shop.</p>',
	},
};
