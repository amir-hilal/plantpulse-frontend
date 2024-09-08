import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import VerifyEmailNotice from './components/common/VerifyEmailNotice';
import Footer from './components/Layout/Footer';
import NavBar from './components/Layout/NavBar';
import { closeMenu } from './features/ui/uiSlice';
import routes from './routes'; // Assuming you have defined routes in a routes.js file

const MainLayout = ({ children }) => {
  const isMenuOpen = useSelector((state) => state.ui.isMenuOpen);
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route

  const handleOverlayClick = () => {
    if (isMenuOpen) {
      dispatch(closeMenu());
    }
  };

  // Condition to check if the current route is home or landing page
  const showFooter =
    location.pathname === routes.home || location.pathname === routes.landing;

  return (
    <>
      <ToastContainer />

      <NavBar />
      <div
        className={`main-content ${isMenuOpen ? 'blurred' : ''}`}
        onClick={handleOverlayClick}
      >
        <VerifyEmailNotice />
        <main>{children}</main>
        {/* Render footer only on home and landing page */}
        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
