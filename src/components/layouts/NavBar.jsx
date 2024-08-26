import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, userProfile } = useSelector((state) => state.auth);

    const menuItems = [
        { label: 'Home', path: "/home" },
        { label: 'My Gardens', path: "/my-gardens", disabled: !isLoggedIn },
        { label: 'Tutorials', path: "/tutorials" },
        { label: 'Calendar', path: "/calendar", disabled: !isLoggedIn },
        { label: 'Flora', path: "/flora" },
        { label: 'Community', path: "/community", disabled: !isLoggedIn },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (path, disabled) => {
        if (!disabled) {
            navigate(path);
            setIsMenuOpen(false); // Close the menu after navigation
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992 && isMenuOpen) {
                setIsMenuOpen(false); // Close the menu if the screen is resized to large
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMenuOpen]);

    return (
        <nav className="bg-secondary p-4 flex justify-content-between align-items-center">
            <img
                src={logo}
                alt="App Logo"
                height={40}
                className="cursor-pointer"
                onClick={() => navigate('/')}
            />
            <ul className="hidden lg:flex list-none m-0 p-0">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handleNavigation(item.path, item.disabled)}
                            className={`bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round ${item.disabled ? 'text-grey' : 'text-tint-5 hover:bg-tint-5 hover:text-primary'}`}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="hidden lg:flex align-items-center">
                {isLoggedIn ? (
                    <>
                        <i className="pi pi-bell text-white text-2xl mr-3 cursor-pointer"></i>
                        <img
                            src={userProfile.picture}
                            alt="Profile"
                            className="h-10 w-10 rounded-full cursor-pointer"
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
                <button onClick={toggleMenu} className="text-tint-5 text-2xl cursor-pointer bg-transparent border-none">
                    <i className="pi pi-bars"></i>
                </button>
            </div>

            {/* Slide-in Menu */}
            {isMenuOpen && (
                <div className="fixed top-0 right-0 h-full w-64 bg-secondary shadow-lg z-50 p-4">
                    <button onClick={toggleMenu} className="text-tint-5 text-2xl cursor-pointer mb-4 bg-transparent border-none">
                        <i className="pi pi-times"></i>
                    </button>
                    <ul className="list-none p-0">
                        {menuItems.map((item, index) => (
                            <li key={index} className="mb-4">
                                <button
                                    onClick={() => handleNavigation(item.path, item.disabled)}
                                    className={`w-full text-left bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round ${item.disabled ? 'text-grey' : 'text-tint-5 hover:bg-tint-5 hover:text-primary'}`}
                                    disabled={item.disabled}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-column align-items-start">
                        {isLoggedIn ? (
                            <>
                                <i className="pi pi-bell text-white text-2xl mb-3 cursor-pointer"></i>
                                <img
                                    src={userProfile.picture}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full cursor-pointer"
                                    onClick={() => navigate('/profile')}
                                />
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {navigate('/login'); toggleMenu()}}
                                    className="bg-primary text-tint-5 px-4 py-3 border-round mb-2 w-full text-left border-none hover:bg-tint-4"
                                >
                                    Login
                                </button>
                                <button
                                        onClick={() => { navigate('/register'); toggleMenu() }}
                                    className="bg-tint-5 text-primary px-4 py-3 border-round w-full text-left border-none hover:bg-tint-4"
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
