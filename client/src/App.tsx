import { Box } from '@chakra-ui/react';
import { AdminPageLayout } from '@client/components/layout/AdminPageLayout';
import { ShopManagerPageLayout } from '@client/components/layout/ShopManagerPageLayout';
import { ScrollToTop } from '@client/components/misc/ScrollToTop';
import { Navbar } from '@client/components/navbar/Navbar';
import { OrderIsolatedPage } from '@client/pages/OrderIsolatedPage';
import { navbarHeight } from '@client/theme';
import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { AppToaster } from './components/feedback/AppToaster';
import { Footer } from './components/footer/Footer';
import { AccountPageLayout } from './components/layout/AccountPageLayout';
import { CLIENT_ROUTES } from './constants';
import { AdminOrderPage } from './pages/Admin/AdminOrderPage';
import { AdminOrdersPage } from './pages/Admin/AdminOrdersPage';
import { AdminShopsPage } from './pages/Admin/AdminShopsPage';
import { AuthCallback } from './pages/AuthCallback';
import { CheckoutPage } from './pages/CheckoutPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LandingPage } from './pages/LandingPage';
import { ListingPage } from './pages/ListingPage';
import { OrderConfirmedPage } from './pages/OrderConfirmedPage';
import { OrderPage } from './pages/OrderPage';
import { OrdersPage } from './pages/OrdersPage';
import { ShopManagerInfoPage } from './pages/ShopManager/ShopManagerInfoPage';
import { ShopManagerListingCreatePage } from './pages/ShopManager/ShopManagerListingCreatePage';
import { ShopManagerListingEditPage } from './pages/ShopManager/ShopManagerListingEditPage';
import { ShopManagerListingsPage } from './pages/ShopManager/ShopManagerListingsPage';
import { ShopPage } from './pages/ShopPage';

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
	return (
		<React.Fragment>
			<ScrollToTop />
			<AppToaster />
			<Navbar />
			<Box
				display="flex"
				flexDirection="column"
				transition="opacity 0.25s"
				pt={navbarHeight}
				zIndex="docked"
			>
				<Box
					minHeight={`calc(100svh - ${navbarHeight}px)`}
					pb={10}
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
						</Route>
						<Route element={<AccountPageLayout />}>
							<Route
								path={`/${CLIENT_ROUTES.favorites}`}
								element={
									<Navigate
										to={`/${CLIENT_ROUTES.favorites}/${CLIENT_ROUTES.listings}`}
										replace
									/>
								}
							/>
							<Route
								path={`/${CLIENT_ROUTES.favorites}/:tab`}
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
							element={<OrderConfirmedPage />}
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
								element={<AdminOrdersPage />}
							/>
							<Route
								path={`/${CLIENT_ROUTES.admin}/${CLIENT_ROUTES.orders}/:shortId`}
								element={<AdminOrderPage />}
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
