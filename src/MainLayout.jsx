import React from 'react';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
