import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import learn from '../../assets/images/learn-green.png'
import tracking from '../../assets/images/tracking-green.png'
import weather from '../../assets/images/weather-green.png'
import chatbot from '../../assets/images/chatbot-green.png'
import connect from '../../assets/images/connect-green.png'

const Carousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        autoplay: false,
        autoplaySpeed: 3000,
        afterChange: current => {
            const slides = document.querySelectorAll('.slick-slide');
            slides.forEach(slide => slide.style.transform = 'scale(0.9)');

            const activeSlide = document.querySelector(`.slick-slide[data-index="${current}"]`);
            if (activeSlide) {
                activeSlide.style.transform = 'scale(1.1)';
            }
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            }
        ]
    };

    const features = [
        {
            title: "Connect With Other Gardeners",
            description: "Share tips and chat with others.",
            img: connect
        },
        {
            title: "Advanced Plant Tracking and Management",
            description: "Monitor plant growth and get care alerts.",
            img: tracking

        },
        {
            title: "Explore And Learn",
            description: "Discover plant care tips and guides.",
            img: learn

        },
        {
            title: "Real-Time Weather Updates",
            description: "Get live weather info.",
            img: weather
        },
        {
            title: "Chatbot Assistance",
            description: "Get instant gardening advice and tips.",
            img: chatbot
        }
    ];

    // Initial effect to set the scale on first render
    useEffect(() => {
        const slides = document.querySelectorAll('.slick-slide');
        slides.forEach(slide => slide.style.transform = 'scale(0.9)');

        const initialActiveSlide = document.querySelector('.slick-slide.slick-center');
        if (initialActiveSlide) {
            initialActiveSlide.style.transform = 'scale(1.1)';
        }
    }, []);

    const renderFeature = (feature, index) => {
        return (
            <div key={index} className='flex justify-content-center'>
                <div className="bg-tint-5 p-3 m-5 max-w-14rem  md:max-w-18rem min-h-10  border-round-lg shadow-2 text-center flex flex-column align-items-center justify-content-center"
                    style={{
                        transition: 'all 0.5s ease'
                    }}>
                    <img src={feature.img} alt="feature" />
                    <h3 className="text-lg text-secondary font-bold m-0">{feature.title}</h3>
                    <p className="text-grey text-sm">{feature.description}</p>
                </div>
            </div>
        );
    };

    return (
        <Slider {...settings} className=' overflow-hidden flex justify-content-center'>
            {features.map((feature, index) => (
                renderFeature(feature, index)
            ))}
        </Slider>
    );
};

export default Carousel;
