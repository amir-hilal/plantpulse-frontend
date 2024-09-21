import React from 'react';
import logo from '../../assets/images/Logo.png'; // Adjust the path to your logo

const Footer = () => {
    return (
        <footer className="bg-secondary text-tint-5">
            <div className="container mx-auto px-4 flex flex-column md:flex-row justify-content-around  p-4 md:p-5">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <img src={logo} alt="PlantPulse Logo" className="mx-auto md:mx-0 mb-4" style={{ height: '40px' }} />
                    <p className="text-tint-5 text-sm md:text-base">© 2024. All rights reserved</p>
                    <div className="flex justify-content-center md:justify-content-start mt-4">
                        <a href="https://instagram.com" className="text-tint-5 text-xl md:text-2xl mx-2">
                            <i className="pi pi-instagram"></i>
                        </a>
                        <a href="https://twitter.com" className="text-tint-5 text-xl md:text-2xl mx-2">
                            <i className="pi pi-twitter"></i>
                        </a>
                    </div>
                </div>
                <div className='flex flex-column md:flex-row'>
                    <div className="text-center md:text-left mb-6 md:mb-0 md:mr-8">
                        <h3 className="font-bold text-white mb-4 text-base md:text-lg">Company</h3>
                        <ul className="list-none p-0">
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">About us</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Blog</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Contact us</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Pricing</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Testimonials</a></li>
                        </ul>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-white mb-4 text-base md:text-lg">Support</h3>
                        <ul className="list-none p-0">
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Help center</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Terms of service</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Legal</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Privacy policy</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline text-sm md:text-base">Status</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
