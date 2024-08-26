import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/common/Carousel';
import ScrollAnimation from '../components/common/ScrollAnimation';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <section className="landing-hero grid">
                <div className="col-12 md:col-6">
                    <h1>Manage your <strong>Garden and Plants</strong></h1>
                    <p>Start your gardening journey today with tools and resources designed for all skill levels.</p>
                    <Button label="Get Started" className="p-button-success mr-2" onClick={() => navigate('/register')} />
                    <Button label="Learn More" className="p-button-secondary" onClick={() => navigate('/tutorials')} />
                </div>
                <div className="col-12 md:col-6">
                    <img src="/path-to-hero-image.png" alt="Gardening" />
                </div>
            </section>
            <section className="features-carousel">
                <Carousel />
            </section>
            <section className="how-it-works">
                <h2>How It Works</h2>
                <ScrollAnimation />
            </section>
        </div>
    );
}

export default LandingPage;
