import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import { LandingPage } from './pages/LandingPage';
import { AuthCallback } from './pages/AuthCallback';
import { ShopManager } from './pages/ShopManager';

const App = () => (
	<>
		<Navbar />
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/callback" element={<AuthCallback />} />
			<Route path="/shop-manager" element={<ShopManager />} />
		</Routes>
	</>
);

export { App };
