import React from 'react';
import { Carousel as PrimeCarousel } from 'primereact/carousel';

const Carousel = () => {
    const features = [
        { title: "Advanced Plant Tracking", description: "Monitor plant growth and get care alerts.", icon: "pi pi-fw pi-leaf" },
        { title: "Explore And Learn", description: "Discover plant care tips and guides.", icon: "pi pi-fw pi-book" },
        { title: "Real-Time Weather Updates", description: "Get live weather info.", icon: "pi pi-fw pi-cloud" },
    ];

    const itemTemplate = (feature) => {
        return (
            <div className="feature-card">
                <i className={feature.icon} style={{ fontSize: '2em' }}></i>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
            </div>
        );
    };

    return (
        <PrimeCarousel value={features} itemTemplate={itemTemplate} numVisible={3} circular autoplayInterval={3000} />
    );
};

export default Carousel;
