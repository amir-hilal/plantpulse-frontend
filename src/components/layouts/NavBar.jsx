import React from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, userProfile } = useSelector((state) => state.auth);

    const items = [
        { label: 'Home', command: () => navigate("/home") },
        { label: 'My Gardens', command: () => navigate("/my-gardens"), visible: isLoggedIn },
        { label: 'Tutorials', command: () => navigate("/tutorials") },
        { label: 'Calendar', command: () => navigate("/calendar"), visible: isLoggedIn },
        { label: 'Flora', command: () => navigate("/flora") },
        { label: 'Community', command: () => navigate("/community"), visible: isLoggedIn },
    ].filter(item => item.visible !== false); // Filter out items that shouldn't be visible

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
