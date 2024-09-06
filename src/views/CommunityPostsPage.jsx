import React, { useCallback, useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import AddPostModal from '../components/common/AddPostModal';
import PostCard from '../components/common/PostCard';
import {
  clearPosts,
  fetchFriendsPosts,
} from '../features/community/postsSlice';

const CommunityPostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const noMorePosts = useSelector((state) => state.posts.noMorePosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchFriendsPosts({ page: 1 }));
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading ||
      noMorePosts
    )
      return;

    dispatch(fetchFriendsPosts({ page: posts.length / 5 + 1 }));
  }, [dispatch, posts.length, loading, noMorePosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="community-posts-page">
      <div className="flex justify-content-between mb-3">
        <h2>Community Posts</h2>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Post
        </button>
      </div>

      <div>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>No posts found...</p>
        )}
      </div>

      {loading && (
        <div className="flex justify-content-center align-items-center my-4">
          <Loading type="spin" color="#019444" height={30} width={30} />
        </div>
      )}

      {noMorePosts && <p className="text-center">No more posts</p>}

      <AddPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CommunityPostsPage;
