import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emptyProfilePicture from '../../assets/images/empty-profile.png';
import logo from '../../assets/images/Logo.png';
import { closeMenu, openMenu } from '../../features/ui/uiSlice';
import { logout } from '../../features/auth/authSlice';

const NavBar = () => {
  const isMenuOpen = useSelector((state) => state.ui.isMenuOpen);
  const [isUtilitiesOpen, setIsUtilitiesOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, userProfile } = useSelector((state) => state.auth);
  const utilitiesRef = useRef(null);
  const communityRef = useRef(null);
  const dispatch = useDispatch();

  const menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'My Gardens', path: '/my-gardens', disabled: !isLoggedIn },
  ];

  const utilitiesItems = [
    { label: 'Flora', path: '/flora' },
    { label: 'Calendar', path: '/calendar', disabled: !isLoggedIn },
    { label: 'Tutorials', path: '/tutorials' },
  ];

  const communityItems = [
    { label: 'Feed', path: '/community/feed', disabled: !isLoggedIn },
    { label: 'Chats', path: '/community/chats', disabled: !isLoggedIn },
  ];

  const toggleMenu = () => {
    if (isMenuOpen) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  };

  const handleUtilitiesToggle = () => {
    setIsUtilitiesOpen(!isUtilitiesOpen);
  };

  const handleCommunityToggle = () => {
    setIsCommunityOpen(!isCommunityOpen);
  };

  const handleClickOutside = (event) => {
    if (utilitiesRef.current && !utilitiesRef.current.contains(event.target)) {
      setIsUtilitiesOpen(false);
    }
    if (communityRef.current && !communityRef.current.contains(event.target)) {
      setIsCommunityOpen(false);
    }
  };

  const handleNavigation = (path, disabled) => {
    if (!disabled) {
      navigate(path);
      dispatch(closeMenu());
      setIsUtilitiesOpen(false);
      setIsCommunityOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && isMenuOpen) {
        dispatch(closeMenu());
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, isMenuOpen]);

  return (
    <nav className="bg-secondary p-4 flex justify-content-between align-items-center">
      <img
        src={logo}
        alt="App Logo"
        height={40}
        className="cursor-pointer"
        onClick={!isMenuOpen ? () => navigate('/') : () => {}}
      />
      <ul className="hidden lg:flex list-none m-0 p-0">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleNavigation(item.path, item.disabled)}
              className={`bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round ${
                item.disabled
                  ? 'text-grey'
                  : 'text-tint-5 hover:bg-tint-5 hover:text-primary'
              }`}
              disabled={item.disabled}
            >
              {item.label}
            </button>
          </li>
        ))}

        {/* Community Group with Custom Popover */}
        <li ref={communityRef}>
          <button
            onClick={handleCommunityToggle}
            className="bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round text-tint-5 hover:bg-tint-5 hover:text-primary"
          >
            Community <i className="pi pi-chevron-down"></i>
          </button>
          {isCommunityOpen && (
            <div className="bg-tint-5 p-2 border-round shadow-lg absolute ml-4 mt-2 z-50">
              <ul className="list-none m-0 p-0">
                {communityItems.map((item, index) => (
                  <li
                    key={index}
                    className={` ${
                      index < communityItems.length - 1
                        ? 'border-bottom-1 border-gray-300'
                        : ''
                    }`}
                  >
                    <button
                      onClick={() => handleNavigation(item.path, item.disabled)}
                      className={`py-3 w-full text-left bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round ${
                        item.disabled
                          ? 'text-grey'
                          : 'text-primary hover:bg-primary hover:text-tint-5'
                      }`}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>

        {/* Utilities Group with Custom Popover */}
        <li ref={utilitiesRef}>
          <button
            onClick={handleUtilitiesToggle}
            className="bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round text-tint-5 hover:bg-tint-5 hover:text-primary"
          >
            Utilities <i className="pi pi-chevron-down"></i>
          </button>
          {isUtilitiesOpen && (
            <div className="bg-tint-5 p-2 border-round shadow-lg absolute mt-2 z-50">
              <ul className="list-none m-0 p-0">
                {utilitiesItems.map((item, index) => (
                  <li
                    key={index}
                    className={` ${
                      index < utilitiesItems.length - 1
                        ? 'border-bottom-1 border-gray-300'
                        : ''
                    }`}
                  >
                    <button
                      onClick={() => handleNavigation(item.path, item.disabled)}
                      className={` py-3 w-full text-left bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round ${
                        item.disabled
                          ? 'text-grey'
                          : 'text-primary hover:bg-primary hover:text-tint-5'
                      }`}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      </ul>
      <div className="hidden justify-content-end lg:flex align-items-center">
        {isLoggedIn ? (
          <>
            <i className="pi pi-bell text-white text-2xl mr-4 cursor-pointer"></i>

            <img
              src={
                userProfile.profile_photo_url ? userProfile.profile_photo_url : emptyProfilePicture
              }
              alt="Profile"
              className="h-2 w-2 border-circle cursor-pointer"
              onClick={() => navigate('/profile')}
            />
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-tint-5 px-4 py-3 border-round mr-2 border-none hover:bg-tint-4"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-tint-5 text-primary px-4 py-3 border-round border-none hover:bg-tint-4"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Burger Menu for Mobile */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-tint-5 text-2xl cursor-pointer bg-transparent border-none"
        >
          <i className="pi pi-bars"></i>
        </button>
      </div>

      {/* Slide-in Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-secondary-light shadow-lg z-50 p-4 flex flex-column justify-content-start">
          {/* Top Section with Close Button, Bell Icon, and Profile Picture */}
          <div className="flex justify-content-between align-items-center">
            <button
              onClick={toggleMenu}
              className="text-tint-5 text-2xl cursor-pointer bg-transparent border-none"
            >
              <i className="pi pi-times"></i>
            </button>
            {isLoggedIn && (
              <div className="flex align-items-center justify-content-end">
                <i className="pi pi-bell text-white text-2xl mr-3 cursor-pointer"></i>
                <img
                  src={
                    userProfile.profile_photo_url
                      ? userProfile.profile_photo_url
                      : emptyProfilePicture
                  }
                  alt="Profile"
                  className="h-2 w-2 border-circle cursor-pointer"
                  onClick={() => {
                    navigate('/profile');
                    toggleMenu();
                  }}
                />
              </div>
            )}
          </div>

          {/* Menu Items */}
          <ul className="list-none p-0 mt-4 mb-0">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <button
                  onClick={() => handleNavigation(item.path, item.disabled)}
                  className={`w-full text-left bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round ${
                    item.disabled
                      ? 'text-grey'
                      : 'text-tint-5 hover:bg-tint-5 hover:text-primary'
                  }`}
                  disabled={item.disabled}
                >
                  {item.label}
                </button>
              </li>
            ))}

            {/* Community Group for Mobile */}
            <li className="mb-4">
              <button
                onClick={handleCommunityToggle}
                className="w-full text-left bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round text-tint-5 hover:bg-tint-5 hover:text-primary"
              >
                Community <i className="pi pi-chevron-down"></i>
              </button>
              {isCommunityOpen && (
                <div className="bg-tint-5 p-2 border-round shadow-lg mt-2 z-50">
                  <ul className="list-none m-0 p-0">
                    {communityItems.map((item, index) => (
                      <li
                        key={index}
                        className={` ${
                          index < communityItems.length - 1
                            ? 'border-bottom-1 border-gray-300'
                            : ''
                        }`}
                      >
                        <button
                          onClick={() =>
                            handleNavigation(item.path, item.disabled)
                          }
                          className={`py-3 w-full text-left bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round text-primary hover:bg-primary hover:text-tint-5`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* Utilities Group for Mobile */}
            <li className="mb-4">
              <button
                onClick={handleUtilitiesToggle}
                className="w-full text-left bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round text-tint-5 hover:bg-tint-5 hover:text-primary"
              >
                Utilities <i className="pi pi-chevron-down"></i>
              </button>
              {isUtilitiesOpen && (
                <div className="bg-tint-5 p-2 border-round shadow-lg mt-2 z-50">
                  <ul className="list-none m-0 p-0">
                    {utilitiesItems.map((item, index) => (
                      <li
                        key={index}
                        className={` ${
                          index < utilitiesItems.length - 1
                            ? 'border-bottom-1 border-gray-300'
                            : ''
                        }`}
                      >
                        <button
                          onClick={() =>
                            handleNavigation(item.path, item.disabled)
                          }
                          className={`py-3 w-full text-left bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round ${
                            item.disabled
                              ? 'text-grey'
                              : 'text-primary hover:bg-primary hover:text-tint-5'
                          }`}
                          disabled={item.disabled}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>

          {/* Bottom Section with Login/Register/Logout Buttons */}
          <div className="flex flex-column align-items-start">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    // Add your logout logic here
                    dispatch(logout());
                    navigate('/login');
                    toggleMenu();
                  }}
                  className="bg-primary text-tint-5 px-4 py-3 border-round mb-2 w-full text-left border-none hover:bg-tint-4 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    toggleMenu();
                  }}
                  className="bg-primary text-tint-5 px-4 py-3 border-round mb-2 w-full text-left border-none hover:bg-tint-4 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    toggleMenu();
                  }}
                  className="bg-tint-5 text-primary px-4 py-3 border-round w-full text-left border-none hover:bg-tint-4 cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
