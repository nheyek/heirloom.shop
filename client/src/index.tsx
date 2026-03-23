import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import { Auth0ProviderWithNavigate } from './providers/AuthProviderWithNavigate';
import { CategoriesProvider } from './providers/CategoriesProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import { ShoppingCartProvider } from './providers/ShoppingCartProvider';
import { UserProvider } from './providers/UserProvider';
import customSystem from './theme';

const root = createRoot(document.getElementById('root')!);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Auth0ProviderWithNavigate>
				<UserProvider>
					<FavoritesProvider>
						<CategoriesProvider>
							<ShoppingCartProvider>
								<ChakraProvider value={customSystem}>
									<App />
								</ChakraProvider>
							</ShoppingCartProvider>
						</CategoriesProvider>
					</FavoritesProvider>
				</UserProvider>
			</Auth0ProviderWithNavigate>
		</BrowserRouter>
	</React.StrictMode>,
);
