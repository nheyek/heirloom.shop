import { Box } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './components/misc/ScrollToTop';
import { Navbar } from './components/navbar/NavBar';
import { AuthCallback } from './pages/AuthCallback';
import { CategoryPage } from './pages/CategoryPage';
import { LandingPage } from './pages/LandingPage';
import { ListingPage } from './pages/ListingPage';
import { ShopManager } from './pages/ShopManager';
import { ShopPage } from './pages/ShopPage';

const App = () => (
	<>
		<ScrollToTop />
		<Navbar />
		<Box maxWidth={1600} mx="auto">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/callback" element={<AuthCallback />} />
				<Route path="/shop-manager" element={<ShopManager />} />
				<Route path="/category/:id" element={<CategoryPage />} />
				<Route path="/shop/:id" element={<ShopPage />} />
				<Route path="/listing/:id" element={<ListingPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Box>
	</>
);

export { App };
