import React, { useEffect } from 'react';
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

  useEffect(() => {
    // Clear previous posts when the component is mounted
    dispatch(clearPosts());

    // Fetch the first page of posts
    dispatch(fetchFriendsPosts({ page: 1 }));
  }, [dispatch]);

  return (
    <div className="home-page">
      {/* Gardens Carousel */}
      <section className="my-gardens-section p-3">
        <MyGardensCarousel />
      </section>

      {/* Community Posts */}
      <section className="community-section p-3">
        <h2>Community Posts</h2>

        {loading && <p>Loading posts...</p>}
        {error && <p>Error loading posts: {error}</p>}

        {!loading && posts.length > 0
          ? posts.map((post) => <PostCard key={post.id} post={post} />)
          : !loading && <p>No posts available</p>}
      </section>
    </div>
  );
};

export default HomePage;
