import React from 'react';
import image from '../assets/images/landingpage-person.png';
import Carousel from '../components/common/Carousel';
import ScrollAnimation from '../components/common/ScrollAnimation';
const LandingPage = () => {
    return (
        <div className='flex justify-content-center flex-column'>
            <section className=" bg-tint-5 px-8">
                <div className="container py-4 flex flex-column  justify-content-between md:flex-row align-items-center">
                    <div className="md:w-1/2 text-center md:text-left">
                        <p className="text-sm text-grey italic mb-2"><i>"Empowering Gardeners Everywhere"</i></p>
                        <h1 className="my-3 font-bold text-secondary leading-tight font-45 ">
                            Manage your <br />
                            <span className="text-primary">Garden and Plants</span>
                        </h1>
                        <p className="text-gray-700 mt-4">
                            Start your gardening journey today with tools and resources designed for all skill levels.
                        </p>
                        <div className="mt-6 flex justify-content-center md:justify-content-start">
                            <button className="bg-primary hover:bg-green-700 text-tint-5 px-4 py-3 rounded-full mr-4 border-none border-round">
                                Get Started
                            </button>
                            <button className="bg-secondary hover:bg-gray-900 text-tint-5 px-4 py-3 rounded-full border-none border-round">
                                Learn More
                            </button>
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
