import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';
import Loading from 'react-loading'; // You can use any loading spinner component
import { useDispatch, useSelector } from 'react-redux';
import MyGardensCarousel from '../components/common/MyGardensCarousel';
import WateringSchedules from '../components/common/WateringSchedules';
import PostCard from '../components/Posts/PostCard';
import {
  clearPosts,
  fetchFriendsPosts,
} from '../features/community/postsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userProfile);
  const authLoading = useSelector((state) => state.auth.loading);
  const [searchTerm, setSearchTerm] = useState('');

  const posts = useSelector((state) => state.posts.posts);
  const postsLoading = useSelector((state) => state.posts.loading);
  const postsError = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (user) {
      dispatch(clearPosts());
      dispatch(fetchFriendsPosts({ page: 1 }));
    }
  }, [dispatch, user]);

  // Show loading spinner while user data is being fetched
  if (authLoading) {
    return (
      <div className="flex justify-content-center align-items-center h-full">
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }

  // If user is not logged in or user data not available, show a message
  if (!user) {
    return <p className='flex align-items-center justify-content-center h-30rem w-full'>Please log in to view the home page.</p>;
  }

  // Render the homepage after user data is fetched and user is logged in
  return (
    <div className="home-page">
      <section className="flex px-2 md:px-4 lg:px-8 my-3 align-items-center justify-content-between">
        <h3 className="text-primary text-sm sm:text-base md:text-lg lg:text-xl">
          Welcome back,{' '}
          <span className="text-secondary">
            {user.first_name} {user.last_name}
          </span>
        </h3>
        <div className="px-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="py-2 pl-6 w-full surface-100 border-solid surface-border border-round-xl appearance-none outline-none focus:border-primary"
          />
        </div>
      </section>
      {/* Gardens Carousel */}
      <section className="  px-2 md:px-4 lg:px-4 py-2  mx-2 md:mx-4 lg:mx-8 h-21rem bg-tint-5 border-round-xl mb-5">
        <MyGardensCarousel />
      </section>

      <div className="flex align-items-center mb-3  px-2 md:px-4 lg:px-8">
        <IoTimeOutline className=" w-2rem  text-secondary" />{' '}
        <h4 className="m-0 ml-2 text-md text-secondary">Today's Watering Schedule</h4>
      </div>
      {/* Watering Schedule */}
      <section className="  px-2 md:px-4 lg:px-4 py-4  mx-2 md:mx-4 lg:mx-8 h-21rem bg-tint-5 border-round-xl mb-5 overflow-x-auto">
        <WateringSchedules />
      </section>

      {/* Community Posts */}
      <section className="  px-2 lg:px-4 py-2  mx-2 md:mx-4 lg:mx-8  border-round-xl mb-5">
        <div className="h-full">
          <div className="flex align-items-center mb-5">
            <FaUsers className=" w-2rem  text-secondary" />{' '}
            <h4 className="m-0 ml-2 text-md text-secondary">Community</h4>
          </div>
          {postsLoading && (
            <div className="flex justify-content-center align-items-center h-full">
              <Loading type="spin" color="#019444" height={50} width={50} />
            </div>
          )}
          {postsError && <p>Error loading posts: {postsError}</p>}
          {!postsLoading && posts.length > 0
            ? posts.map((post) => <PostCard key={post.id} post={post} />)
            : !postsLoading && <p>No posts available</p>}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
