import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        autoplay: true,
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
            icon: "pi pi-users",
        },
        {
            title: "Advanced Plant Tracking and Management",
            description: "Monitor plant growth and get care alerts.",
            icon: "pi pi-chart-line",
        },
        {
            title: "Explore And Learn",
            description: "Discover plant care tips and guides.",
            icon: "pi pi-book",
        },
        {
            title: "Real-Time Weather Updates",
            description: "Get live weather info.",
            icon: "pi pi-cloud",
        },
        {
            title: "Chatbot Assistance",
            description: "Get instant gardening advice and tips.",
            icon: "pi pi-comment",
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
            <div key={index} className="flex align-items-center justify-content-center m-2">
                <div className="bg-tint-5  m-6  min-h-10  border-round-lg shadow-2 text-center flex flex-column align-items-center justify-content-center"
                    style={{
                        transition: 'all 0.5s ease'
                    }}>
                    <i className={`${feature.icon} text-4xl text-primary mb-4`}></i>
                    <h3 className="text-xl font-bold m-0">{feature.title}</h3>
                    <p className="text-grey text-sm">{feature.description}</p>
                </div>
            </div>
        );
    };

    return (
        <Slider {...settings}>
            {features.map((feature, index) => (
                renderFeature(feature, index)
            ))}
        </Slider>
    );
};

export default Carousel;
