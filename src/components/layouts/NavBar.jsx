import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';

const NavBar = () => {
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

    return (
        <nav className="bg-secondary p-4 flex justify-content-between align-items-center">
            <img
                src={logo}
                alt="App Logo"
                height={40}
                className="cursor-pointer"
                onClick={() => navigate('/')}
            />
            <ul className="flex  list-none m-0 p-0">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={() => !item.disabled && navigate(item.path)}
                            className={`bg-transparent pr-4 pl-4 border-none font-16 cursor-pointer border-round  ${item.disabled ? 'text-grey' : 'text-tint-5 hover:bg-tint-5 hober:text-primary'}`}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex align-items-center">
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
                            className="bg-primary text-tint-5  px-4  py-3 border-round mr-2 border-none"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-tint-5 text-primary  px-4 py-3 border-round border-none"
                        >
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
