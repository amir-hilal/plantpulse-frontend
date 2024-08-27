import React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import RegisterPage from './views/RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/home" element={<HomePag />} />
                    <Route path="/login" element={<LoginPage />} /> */}
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
