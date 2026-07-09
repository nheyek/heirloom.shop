import { Box } from '@chakra-ui/react';
import { AdminPageLayout } from '@client/components/layout/AdminPageLayout';
import { ShopManagerPageLayout } from '@client/components/layout/ShopManagerPageLayout';
import { Navbar } from '@client/components/navbar/NavBar';
import { ScrollToTop } from '@client/components/util/ScrollToTop';
import { OrderIsolatedPage } from '@client/pages/OrderIsolatedPage';
import { NAVBAR_HEIGHT } from '@client/theme';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { AppToaster } from './components/feedback/AppToaster';
import { Footer } from './components/footer/Footer';
import { AccountPageLayout } from './components/layout/AccountPageLayout';
import { CLIENT_ROUTES } from './constants';
import { AdminShopsPage } from './pages/Admin/AdminShopsPage';
import { AuthCallback } from './pages/AuthCallback';
import { CategoryPage } from './pages/CategoryPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LandingPage } from './pages/LandingPage';
import { ListingPage } from './pages/ListingPage';
import { OrderPage } from './pages/OrderPage';
import { OrdersPage } from './pages/OrdersPage';
import { ShopManagerInfoPage } from './pages/ShopManager/ShopManagerInfoPage';
import { ShopManagerListingCreatePage } from './pages/ShopManager/ShopManagerListingCreatePage';
import { ShopManagerListingEditPage } from './pages/ShopManager/ShopManagerListingEditPage';
import { ShopManagerListingsPage } from './pages/ShopManager/ShopManagerListingsPage';
import { ShopManagerMessagesPage } from './pages/ShopManager/ShopManagerMessagesPage';
import { ShopManagerOrdersPage } from './pages/ShopManager/ShopManagerOrdersPage';
import { ShopPage } from './pages/ShopPage';
import { OrderSuccess } from './pages/SuccessPage';

const ShopManagerDefaultRedirect = () => {
	const { shortId } = useParams<{ shortId: string }>();
	return (
		<Navigate
			to={`/${CLIENT_ROUTES.shop}/${shortId}/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.info}`}
			replace
		/>
	);
};

const App = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<React.Fragment>
			<AppToaster />
			<Navbar />
			<Box
				display="flex"
				flexDirection="column"
				minHeight="120dvh"
				pt={{
					base: NAVBAR_HEIGHT.MOBILE,
					md: NAVBAR_HEIGHT.DESKTOP,
				}}
				opacity={mounted ? 1 : 0}
				transition="opacity 0.25s"
			>
				<ScrollToTop />

				<Box
					flex="1"
					width="100%"
					mx="auto"
					position="relative"
				>
					<Routes>
						<Route
							path="/"
							element={<LandingPage />}
						/>
						<Route
							path="/callback"
							element={<AuthCallback />}
						/>
						<Route element={<ShopManagerPageLayout />}>
							<Route
								path={`/${CLIENT_ROUTES.shop}/:shortId/${CLIENT_ROUTES.manage}`}
								element={
									<ShopManagerDefaultRedirect />
								}
							/>
							<Route
								path={`/${CLIENT_ROUTES.shop}/:shortId/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.info}`}
								element={<ShopManagerInfoPage />}
							/>
							<Route
								path={`/${CLIENT_ROUTES.shop}/:shortId/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}`}
								element={<ShopManagerListingsPage />}
							/>
							<Route
								path={`/${CLIENT_ROUTES.shop}/:shortId/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}/${CLIENT_ROUTES.new}`}
								element={
									<ShopManagerListingCreatePage />
								}
							/>
							<Route
								path={`/${CLIENT_ROUTES.shop}/:shortId/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.listings}/:listingShortId`}
								element={
									<ShopManagerListingEditPage />
								}
							/>
							<Route
								path={`/${CLIENT_ROUTES.shop}/:shortId/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.orders}`}
								element={<ShopManagerOrdersPage />}
							/>
							<Route
								path={`/${CLIENT_ROUTES.shop}/:shortId/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.messages}`}
								element={<ShopManagerMessagesPage />}
							/>
							<Route
								path={`/${CLIENT_ROUTES.shop}/:shortId/${CLIENT_ROUTES.manage}/${CLIENT_ROUTES.settings}`}
								element={null}
							/>
						</Route>
						<Route element={<AccountPageLayout />}>
							<Route
								path={`/${CLIENT_ROUTES.favorites}`}
								element={<FavoritesPage />}
							/>
							<Route
								path={`/${CLIENT_ROUTES.orders}`}
								element={<OrdersPage />}
							/>
							<Route
								path={`/${CLIENT_ROUTES.orders}/:shortId`}
								element={<OrderPage />}
							/>
						</Route>
						<Route
							path={`/${CLIENT_ROUTES.order}/:shortId`}
							element={<OrderIsolatedPage />}
						/>
						<Route
							path={`/${CLIENT_ROUTES.category}/:id`}
							element={<CategoryPage />}
						/>
						<Route
							path={`/${CLIENT_ROUTES.shop}/:id`}
							element={<ShopPage />}
						/>
						<Route
							path={`/${CLIENT_ROUTES.listing}/:id`}
							element={<ListingPage />}
						/>
						<Route
							path={`/${CLIENT_ROUTES.checkout}`}
							element={<CheckoutPage />}
						/>
						<Route
							path={`/${CLIENT_ROUTES.orderConfirmed}`}
							element={<OrderSuccess />}
						/>
						<Route element={<AdminPageLayout />}>
							<Route
								path={`/${CLIENT_ROUTES.admin}`}
								element={
									<Navigate
										to={`/${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.shops}`}
										replace
									/>
								}
							/>
							<Route
								path={`/${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.shops}`}
								element={<AdminShopsPage />}
							/>
							<Route
								path={`/${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.orders}`}
								element={null}
							/>
							<Route
								path={`/${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.analytics}`}
								element={null}
							/>
						</Route>

						<Route
							path="*"
							element={
								<Navigate
									to="/"
									replace
								/>
							}
						/>
					</Routes>
				</Box>
				<Footer />
			</Box>
		</React.Fragment>
	);
};

export { App };
