import { AppShell } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';

const AppRoutes = () => {
  return (
    <AppShell>
        <AppShell.Header>
        </AppShell.Header>

        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>

        <AppShell.Footer>
        </AppShell.Footer>
    </AppShell>
  );
}

export default AppRoutes;