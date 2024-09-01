import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/layouts/Footer';
import NavBar from './components/layouts/NavBar';
import { closeMenu } from './features/ui/uiSlice';
import VerifyEmailNotice from './components/common/VerifyEmailNotice';

const MainLayout = ({ children }) => {
  const isMenuOpen = useSelector((state) => state.ui.isMenuOpen);
  const dispatch = useDispatch();
  const handleOverlayClick = () => {
    if (isMenuOpen) {
      dispatch(closeMenu());
    }
  };
  return (
    <>
      <NavBar />
      <div
        className={`main-content ${isMenuOpen ? 'blurred' : ''}`}
        onClick={handleOverlayClick}
      >
         <VerifyEmailNotice />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
