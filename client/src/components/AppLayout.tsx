import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';

const AppLayout = () => {
    
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
        </Routes>
    );
}

export default AppLayout;