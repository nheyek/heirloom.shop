import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { Route, Routes } from 'react-router-dom';
import { AuthCallback } from './AuthCallback';
import AppRoutes from './AppRoutes';

const App = () =>
	<Routes>
		<Route path="/auth/callback" element={<AuthCallback />} />
		<Route path="/*" element={<AppRoutes />} />
	</Routes>

export { App };