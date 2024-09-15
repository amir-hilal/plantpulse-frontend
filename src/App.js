import React, { useEffect } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GoogleAuthFailure from './components/common/GoogleAuthFailure';
import GoogleAuthSuccess from './components/common/GoogleAuthSuccess';
import Guard from './components/common/Guard';
import { initializeUser } from './features/auth/authSlice';
import MainLayout from './MainLayout';
import routes from './routes';
import ChatsPage from './views/ChatsPage';
import CommunityPostsPage from './views/CommunityPostsPage';
import ConnectPage from './views/ConnectPage';
import HomePage from './views/HomePage';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import MyGardensPage from './views/MyGardensPage';
import PostDetailsPage from './views/PostDetailsPage';
import ProfilePage from './views/ProfilePage';
import RegisterPage from './views/RegisterPage';
import TutorialDetailPage from './views/TutorialDetailsPage';
import Tutorials from './views/TutorialsPage';
import PlantDetailsPage from './views/PlantDetailsPage';

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
        <Route path="/auth/google/callback" element={<GoogleAuthSuccess />} />
        <Route path="/auth/google/failure" element={<GoogleAuthFailure />} />
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
                <Route path={routes.landing} element={<LandingPage />} />
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
                      <MyGardensPage />
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
                <Route
                  path={routes.post_details(':id')}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <PostDetailsPage />
                    </Guard>
                  }
                />

                <Route
                  path={routes.community_posts}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <CommunityPostsPage />
                    </Guard>
                  }
                />
                <Route
                  path={routes.tutorials}
                  element={
                    <Guard authRequired={false} redirectPath={routes.home}>
                      <Tutorials />
                    </Guard>
                  }
                />
                <Route
                  path={routes.tutorial_details(':id')}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <TutorialDetailPage />
                    </Guard>
                  }
                />

                <Route
                  path={routes.community_chats}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <ChatsPage />
                    </Guard>
                  }
                />

                <Route
                  path={routes.home}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <HomePage />
                    </Guard>
                  }
                />

                <Route
                  path={routes.PlantDetailsPage(':id')}
                  element={
                    <Guard authRequired={true} redirectPath={routes.home}>
                      <PlantDetailsPage />
                    </Guard>
                  }
                />
                {/*

<Route path="/plant-details" element={<PlantDetailsPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  */}
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
