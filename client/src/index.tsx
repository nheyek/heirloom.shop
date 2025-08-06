import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider value={defaultSystem}>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
);