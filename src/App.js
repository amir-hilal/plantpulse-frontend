import React, { useEffect } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Guard from './components/common/Guard';
import { initializeUser } from './features/auth/authSlice';
import MainLayout from './MainLayout';
import routes from './routes';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import MyGardenPage from './views/MyGardenPage';
import ProfilePage from './views/ProfilePage';
import RegisterPage from './views/RegisterPage';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(initializeUser());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />

        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path={routes.home} element={<LandingPage />} />
                <Route path={routes.profile()} element={<ProfilePage />} />
                <Route
                  path={routes.myGardens}
                  element={
                    <Guard>
                      <MyGardenPage />
                    </Guard>
                  }
                />
                {/* <Route path="/home" element={<HomePage />} />
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
