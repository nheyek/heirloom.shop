import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar/NavBar';
import { ScrollToTop } from './components/util/ScrollToTop';
import { CLIENT_ROUTES } from './constants';
import { AuthCallback } from './pages/AuthCallback';
import { CategoryPage } from './pages/CategoryPage';
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
		<Box opacity={mounted ? 1 : 0} transition="opacity 1s">
			<ScrollToTop />
			<Navbar />
			<Box maxWidth={1600} mx="auto">
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/callback" element={<AuthCallback />} />
					<Route path={`/${CLIENT_ROUTES.shopManager}`} element={<ShopManager />} />
					<Route path={`/${CLIENT_ROUTES.category}/:id`} element={<CategoryPage />} />
					<Route path={`/${CLIENT_ROUTES.shop}/:id`} element={<ShopPage />} />
					<Route path={`/${CLIENT_ROUTES.listing}/:id`} element={<ListingPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Box>
		</Box>
	);
};

export { App };
