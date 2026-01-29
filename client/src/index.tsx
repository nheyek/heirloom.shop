import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import { Auth0ProviderWithNavigate } from './Providers/AuthProviderWithNavigate';
import { CategoriesProvider } from './Providers/CategoriesProvider';
import { UserProvider } from './Providers/UserProvider';
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
