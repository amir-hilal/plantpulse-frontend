import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import LandingPage from './components/pages/LandingPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userProfile = {
        picture: "/path-to-user-profile-picture.png"
    };

    return (
        <Router>
            <div className="App">
                <NavBar isLoggedIn={isLoggedIn} userProfile={userProfile} />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        {/* Add more routes here, e.g., HomePage, MyGardenPage, etc. */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
