import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './fonts.css';
import { Auth0ProviderWithNavigate } from './providers/AuthProviderWithNavigate';
import { CategoriesProvider } from './providers/CategoriesProvider';
import { UserProvider } from './providers/UserProvider';
import customSystem from './theme';

const root = createRoot(document.getElementById('root')!);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Auth0ProviderWithNavigate>
				<UserProvider>
					<CategoriesProvider>
						<ChakraProvider value={customSystem}>
							<App />
						</ChakraProvider>
					</CategoriesProvider>
				</UserProvider>
			</Auth0ProviderWithNavigate>
		</BrowserRouter>
	</React.StrictMode>,
);
