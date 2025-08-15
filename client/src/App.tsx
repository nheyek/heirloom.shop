import { useEffect, useState } from 'react';
import { Product } from './models/Product';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import { LandingPage } from './pages/LandingPage';
import { AuthCallback } from './pages/AuthCallback';

const App = () =>
	<>
		<Navbar />
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/callback" element={<AuthCallback />} />
		</Routes>
	</>


export { App };