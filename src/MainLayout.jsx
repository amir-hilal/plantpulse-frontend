import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ChatModal from './components/common/ChatModal';
import FloatingChatButton from './components/common/FloatingChatButton';
import VerifyEmailNotice from './components/common/VerifyEmailNotice';
import Footer from './components/Layout/Footer';
import NavBar from './components/Layout/NavBar';
import { closeMenu } from './features/ui/uiSlice';
import routes from './routes';

const MainLayout = ({ children }) => {
  const isMenuOpen = useSelector((state) => state.ui.isMenuOpen);
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route
  const [isChatOpen, setChatOpen] = useState(false);

  const handleOverlayClick = () => {
    if (isMenuOpen) {
      dispatch(closeMenu());
    }
  };

  // Condition to check if the current route is home or landing page
  const showFooter =
    location.pathname === routes.home || location.pathname === routes.landing;
  const noChatButtonPages = location.pathname === routes.community_chats;

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
        {showFooter && <Footer />}
      </div>
      {!noChatButtonPages && (
        <FloatingChatButton
          onClick={() => setChatOpen(!isChatOpen)}
          isChatOpen={isChatOpen}
        />
      )}

      <ChatModal isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default MainLayout;
