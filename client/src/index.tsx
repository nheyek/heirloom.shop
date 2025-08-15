import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import customSystem from './theme';
import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0ProviderWithNavigate } from './providers/AuthProviderWithNavigate';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <ChakraProvider value={customSystem}>
                    <App />
                </ChakraProvider>
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    </React.StrictMode>
);