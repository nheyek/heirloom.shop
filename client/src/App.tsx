import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/NavBar/NavBar';
import { ScrollToTop } from './components/Util/ScrollToTop';
import { CLIENT_ROUTES } from './constants';
import { AuthCallback } from './Pages/AuthCallback';
import { CategoryPage } from './Pages/CategoryPage';
import { LandingPage } from './Pages/LandingPage';
import { ListingPage } from './Pages/ListingPage';
import { ShopManager } from './Pages/ShopManager';
import { ShopPage } from './Pages/ShopPage';

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
