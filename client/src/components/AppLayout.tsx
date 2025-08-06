import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import Navbar from './NavBar';

const AppLayout = () => {
    
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </>
    );
}

export default AppLayout;