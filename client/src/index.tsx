import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import { ScrollToTop } from '@client/components/util/ScrollToTop';
import { StripeProvider } from '@client/providers/StripeProvider';
import { Auth0ProviderWithNavigate } from './providers/AuthProviderWithNavigate';
import { CategoriesProvider } from './providers/CategoriesProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import { ShoppingCartProvider } from './providers/ShoppingCartProvider';
import { UserProvider } from './providers/UserProvider';
import customSystem from './theme';

const root = createRoot(document.getElementById('root')!);
root.render(
	<React.StrictMode>
		<div id="anchor"></div>
		<BrowserRouter>
			<Auth0ProviderWithNavigate>
				<UserProvider>
					<FavoritesProvider>
						<CategoriesProvider>
							<ShoppingCartProvider>
								<ChakraProvider value={customSystem}>
									<StripeProvider>
										<App />
									</StripeProvider>
								</ChakraProvider>
							</ShoppingCartProvider>
						</CategoriesProvider>
					</FavoritesProvider>
				</UserProvider>
			</Auth0ProviderWithNavigate>
			<ScrollToTop />
		</BrowserRouter>
	</React.StrictMode>,
);
