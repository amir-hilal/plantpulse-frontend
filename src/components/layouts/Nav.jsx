import React from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ isLoggedIn, userProfile }) => {
    const navigate = useNavigate();

    const items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', command: () => navigate("/home") },
        { label: 'My Gardens', icon: 'pi pi-fw pi-leaf', command: () => navigate("/my-gardens") },
        { label: 'Tutorials', icon: 'pi pi-fw pi-book', command: () => navigate("/tutorials") },
        { label: 'Calendar', icon: 'pi pi-fw pi-calendar', command: () => navigate("/calendar") },
        { label: 'Flora', icon: 'pi pi-fw pi-apple', command: () => navigate("/flora") },
        { label: 'Community', icon: 'pi pi-fw pi-users', command: () => navigate("/community") },
    ];

    const start = <img alt="logo" src="/path-to-your-logo.png" height="40" className="mr-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />;

    const end = isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="pi pi-bell" style={{ fontSize: '1.5rem', marginRight: '1rem', cursor: 'pointer' }}></i>
            <img src={userProfile.picture} alt="Profile" style={{ height: '40px', width: '40px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => navigate('/profile')} />
        </div>
    ) : (
        <>
            <Button label="Login" className="p-button-text p-mr-2" onClick={() => navigate('/login')} />
            <Button label="Sign up" className="p-button-success p-mr-2" onClick={() => navigate('/register')} />
        </>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}

export default NavBar;
