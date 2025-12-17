import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/NavBar';
import { AuthCallback } from './pages/AuthCallback';
import { CategoryPage } from './pages/CategoryPage';
import { LandingPage } from './pages/LandingPage';
import { ShopManager } from './pages/ShopManager';

const App = () => (
	<>
		<Navbar />
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/callback" element={<AuthCallback />} />
			<Route path="/shop-manager" element={<ShopManager />} />
			<Route path="/category/:id" element={<CategoryPage />} />
		</Routes>
	</>
);

export { App };
