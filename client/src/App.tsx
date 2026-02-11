import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import { ScrollToTop } from './components/misc/ScrollToTop';
import { Navbar } from './components/navbar/NavBar';
import { CLIENT_ROUTES } from './constants';
import { AuthCallback } from './pages/AuthCallback';
import { CategoryPage } from './pages/CategoryPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LandingPage } from './pages/LandingPage';
import { ListingPage } from './pages/ListingPage';
import { ShopManager } from './pages/ShopManager';
import { ShopPage } from './pages/ShopPage';

const App = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Box
			display="flex"
			flexDirection="column"
			minHeight="100dvh"
			opacity={mounted ? 1 : 0}
			transition="opacity 0.5s"
		>
			<ScrollToTop />
			<Navbar />
			<Box
				flex="1"
				width="100%"
				maxWidth={1600}
				mx="auto"
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
					<Route
						path={`/${CLIENT_ROUTES.shopManager}`}
						element={<ShopManager />}
					/>
					<Route
						path={`/${CLIENT_ROUTES.favorites}`}
						element={<FavoritesPage />}
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
	);
};

export { App };
