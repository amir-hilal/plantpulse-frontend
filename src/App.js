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
import ConnectPage from './views/ConnectPage';

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
        <Route
          path={routes.login}
          element={
            <Guard authRequired={false} redirectPath={routes.home}>
              <LoginPage />
            </Guard>
          }
        />
        <Route
          path={routes.register}
          element={
            <Guard authRequired={false} redirectPath={routes.home}>
              <RegisterPage />
            </Guard>
          }
        />

        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path={routes.home} element={<LandingPage />} />
                <Route
                  path={routes.profile(':username')}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <ProfilePage />
                    </Guard>
                  }
                />
                <Route
                  path={routes.myGardens}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <MyGardenPage />
                    </Guard>
                  }
                />
                 <Route
                  path={routes.community_connect}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <ConnectPage />
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
