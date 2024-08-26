import React from 'react';
import logo from '../../assets/images/Logo.png'; // Adjust the path to your logo

const Footer = () => {
    return (
        <footer className="bg-secondary text-tint-5 py-12">
            <div className="container mx-auto px-4 flex justify-content-around p-7">
                <div className="text-center md:text-left">
                    <img src={logo} alt="PlantPulse Logo" className="mx-auto md:mx-0 mb-4" />
                    <p className="text-tint-5">© 2024. All rights reserved</p>
                    <div className="flex justify-center md:justify-start mt-4">
                        <a href="https://instagram.com" className="text-tint-5 text-2xl mx-2">
                            <i className="pi pi-instagram"></i>
                        </a>
                        <a href="https://twitter.com" className="text-tint-5 text-2xl mx-2">
                            <i className="pi pi-twitter"></i>
                        </a>
                    </div>
                </div>
                <div className='flex'>
                    <div className="text-center md:text-left mr-3">
                        <h3 className=" font-bold text-white mb-4 mt-0">Company</h3>
                        <ul className="list-none p-0">
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">About us</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Blog</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Contact us</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Pricing</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Testimonials</a></li>
                        </ul>
                    </div>
                    <div className="text-center md:text-left ml-3">
                        <h3 className=" font-bold text-white mb-4 mt-0">Support</h3>
                        <ul className="list-none p-0">
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Help center</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Terms of service</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Legal</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Privacy policy</a></li>
                            <li className="mb-3"><a href="/#" className="text-tint-5 hover:text-tint-3 no-underline">Status</a></li>
                        </ul>
                        </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
