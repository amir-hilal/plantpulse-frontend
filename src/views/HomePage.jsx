import React from 'react';
import MyGardensCarousel from '../components/common/MyGardensCarousel';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="my-gardens-section p-3">
        <MyGardensCarousel />
      </section>

      <section className="community-section p-3">
        {/* <CommunityPosts /> */}
      </section>
    </div>
  );
};

export default HomePage;
