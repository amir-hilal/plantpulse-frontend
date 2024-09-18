import React, { useCallback, useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddPostModal from '../components/Posts/AddPostModal';
import PostCard from '../components/Posts/PostCard';
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
  const user = useSelector((state) => state.auth.userProfile);
  const userLoading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
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

  if (userLoading) {
    // Show a loading spinner while user data is being fetched
    return (
      <div className="flex justify-content-center align-items-center h-full">
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }
  if (!user) {
    return (
      <p className="flex align-items-center justify-content-center h-30rem w-full">
        Please log in to view the community posts.
      </p>
    );
  }

  return (
    <div className="community-posts-page px-8">
      <div className="flex flex-column my-3">
        <div className="flex align-items-center mb-5">
          <FaUsers className=" w-2rem  text-grey" />{' '}
          <h4 className="m-0 ml-2 text-md text-grey">Community</h4>
        </div>

        <div>
          <div className="flex justify-content-between">
            <div
              className="border-round flex align-items-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={user.profile_photo_url}
                alt="Profile"
                className="h-3rem w-3rem border-circle mr-3"
              />
              <p className="m-0 text-primary">Add new post...</p>
            </div>
            <button
              onClick={() => navigate('/community/connect')}
              className=" text-sm bg-primary border-round border-solid border-primary hover:bg-primary-reverse py-2  flex align-items-center justify-content-center cursor-pointer ml-1 md:ml-0"
            >
              <FaUsers className=" w-2rem mr-2 " />
              Connect
            </button>
          </div>
        </div>
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

      {noMorePosts && posts.length !== 0 && (
        <p className="text-center">No more posts</p>
      )}

      <AddPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CommunityPostsPage;
