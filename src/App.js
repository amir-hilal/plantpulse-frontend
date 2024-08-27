import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/layouts/Footer';
import NavBar from './components/layouts/NavBar';
import LandingPage from './views/LandingPage';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/my-gardens" element={<MyGardenPage />} />
                    <Route path="/plant-details" element={<PlantDetailsPage />} />
                    <Route path="/flora" element={<FloraPage />} />
                    <Route path="/tutorials" element={<TutorialsPage />} />
                    <Route path="/tutorial-details" element={<TutorialDetailsPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/chats" element={<ChatsPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
