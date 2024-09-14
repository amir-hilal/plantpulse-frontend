import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGardensCarousel from '../components/common/MyGardensCarousel';
import PostCard from '../components/posts/PostCard';
import {
  clearPosts,
  fetchFriendsPosts,
} from '../features/community/postsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const user = useSelector((state) => state.auth.userProfile);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Clear previous posts when the component is mounted
    dispatch(clearPosts());

    // Fetch the first page of posts
    dispatch(fetchFriendsPosts({ page: 1 }));
  }, [dispatch]);

  return (
    <div className="home-page">
      <section className="flex px-8 my-3 align-items-center justify-content-between">
        <h3 className="text-primary">
          Welcom back,{' '}
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
      <section className=" px-6 py-2  mx-8 h-20rem bg-tint-5 border-round-xl mb-5">
        <MyGardensCarousel />
      </section>

      {/* Community Posts */}
      <section className=" px-6 py-2  mx-8 h-20rem bg-tint-5 border-round-xl mb-5">
        <div className="h-full">
          <h2>Community Posts</h2>

          {loading && <p>Loading posts...</p>}
          {error && <p>Error loading posts: {error}</p>}

          {!loading && posts.length > 0
            ? posts.map((post) => <PostCard key={post.id} post={post} />)
            : !loading && <p>No posts available</p>}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
