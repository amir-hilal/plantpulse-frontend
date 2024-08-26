import React from 'react';

const Footer = () => {
    return (
        <footer className="grid justify-content-center align-items-center">
            <div className="col-12 md:col-6">
                <p>© 2024 PlantPulse. All rights reserved.</p>
            </div>
            <div className="col-12 md:col-6">
                <ul className="footer-links">
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
