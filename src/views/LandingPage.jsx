import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/2.jpg';
import image3 from '../assets/images/3.jpg';
import image from '../assets/images/landingpage-person.png';
import Carousel from '../components/common/Carousel';
import HowItWorks from '../components/common/HowItWorks/HowItWorks';
const LandingPage = () => {
  const howItWorksRef = useRef(null);
  const navigate = useNavigate();
  const handleScroll = () => {
    howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="flex justify-content-center flex-column">
      <section className="bg-transparent px-8">
        <div className="container py-4 flex flex-column justify-content-between md:flex-row align-items-center md:align-items-start">
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-xs md:text-sm text-grey italic mb-2">
              <i>"Empowering Gardeners Everywhere"</i>
            </p>
            <h1 className="my-3 font-bold text-secondary leading-tight text-3xl md:text-5xl">
              Manage your <br />
              <span className="text-primary">Garden and Plants</span>
            </h1>
            <p className="text-sm md:text-base text-gray-700 mt-4">
              Start your gardening journey today with tools and resources
              designed for all skill levels.
            </p>
            <div className="mt-2 md:mt-6 flex justify-content-center md:justify-content-start">
              <button
                onClick={() => {
                  navigate('/home');
                }}
                className="text-xs md:text-sm bg-primary hover:bg-green-700 text-tint-5 px-4 py-3 rounded-full mr-4 border-none border-round cursor-pointer"
              >
                Get Started
              </button>
              <button
                onClick={handleScroll}
                className="text-xs md:text-sm bg-secondary hover:bg-gray-900 text-tint-5 px-4 py-3 rounded-full border-none border-round cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="w-8 md:w-7 lg:w-5 xl:w-3 mt-2 md:mt-0">
            <img
              src={image}
              alt="Gardening"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="max-w-screen overflow-hidden flex justify-content-center">
        <Carousel />
      </section>
      <hr />
      <section className=" py-4" ref={howItWorksRef}>
        <HowItWorks />
      </section>
      <h2 className='text-center text-secondary mb-6'>What our Users Say</h2>
      <section className="flex justify-content-around mb-6">
        <div className="flex flex-column align-items-center">
          {' '}
          <img
            src={image1}
            alt="person 1"
            className="border-circle w-6rem h-6rem shadow-lg"
          />
          <h3 className='pb-0 text-secondary'>Jhon Doe</h3>
          <p className="text-sm text-grey mt-0">
            <i>"Made life so much easier"</i>
          </p>
        </div>
        <div className="flex flex-column align-items-center">
          {' '}
          <img
            src={image2}
            alt="person 1"
            className="border-circle w-6rem h-6rem shadow-lg"
          />
          <h3 className='pb-0 text-secondary'>Dora A. Garcia</h3>
          <p className="text-sm text-grey mt-0">
            <i>"My garden is looking better now"</i>
          </p>
        </div>{' '}
        <div className="flex flex-column align-items-center">
          {' '}
          <img
            src={image3}
            alt="person 1"
            className="border-circle w-6rem h-6rem shadow-lg"
          />
          <h3 className='pb-0 text-secondary'>Janina R. Parkison</h3>
          <p className="text-sm text-grey mt-0">
            <i>"My plants are growing fast!"</i>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
