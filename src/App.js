import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { initializeUser } from './features/auth/authSlice';
import MainLayout from './MainLayout';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ProfilePage from './views/ProfilePage';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(initializeUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                {/* <Route path="/home" element={<HomePage />} />
                  <Route path="/my-gardens" element={<MyGardenPage />} />
                  <Route path="/plant-details" element={<PlantDetailsPage />} />
                  <Route path="/flora" element={<FloraPage />} />
                  <Route path="/tutorials" element={<TutorialsPage />} />
                  <Route
                    path="/tutorial-details"
                    element={<TutorialDetailsPage />}
                  />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/chats" element={<ChatsPage />} /> */}
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
