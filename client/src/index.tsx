import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <MantineProvider>
            <Notifications />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MantineProvider>
    </React.StrictMode>
);