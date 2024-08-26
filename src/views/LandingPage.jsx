import React from 'react';
import Carousel from '../components/common/Carousel';
import ScrollAnimation from '../components/common/ScrollAnimation';
import image from '../assets/images/landingpage-person.png'
const LandingPage = () => {
    return (
        <div>
            <section className="bg-blue-100">
                <div className="flex flex-col md:flex-row items-center container mx-auto px-4">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold text-blue-900">Manage your <span className="text-green-600">Garden and Plants</span></h1>
                        <p className="text-gray-700 mt-4">Start your gardening journey today with tools and resources designed for all skill levels.</p>
                        <div className="mt-6">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full mr-4">Get Started</button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">Learn More</button>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <img src={image} height={300} alt="Gardening" className="w-full rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>
            <section>
                <Carousel />
            </section>
            <section className="bg-gray-100 py-8">
                <h2 className="text-3xl font-bold text-center text-blue-900">How It Works</h2>
                <ScrollAnimation />
            </section>
        </div>
    );
};

export default LandingPage;
