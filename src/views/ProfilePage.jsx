import React, { useCallback, useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddPostModal from '../components/common/AddPostModal';
import FriendsTab from '../components/common/FriendsTab';
import PostCard from '../components/common/PostCard';
import TabView from '../components/common/TabView';
import AboutSection from '../components/Profile/AboutSection';
import ProfileHeader from '../components/Profile/ProfileHeader';
import { logout } from '../features/auth/authSlice';
import {
  clearSearchResults,
  fetchFriends,
  searchFriends,
} from '../features/community/friendsSlice';
import {
  clearPosts,
  fetchPostsByUsername,
} from '../features/community/postsSlice';
import api from '../services/api';

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const posts = useSelector((state) => state.posts.posts);
  const postLoading = useSelector((state) => state.posts.loading);
  const noMorePosts = useSelector((state) => state.posts.noMorePosts);
  const friends = useSelector((state) => state.friends.friends);
  const searchResults = useSelector((state) => state.friends.searchResults);
  const user = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/${username}`);
        setProfileData(response.data);
        if (user && response.data.username === user.username) {
          setIsOwner(true);
        }
      } catch (error) {
        if (error.response.status === 404) {
          setProfileData(null);
        } else if (error.response.status === 401) {
          dispatch(logout());
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, user, dispatch]);

  useEffect(() => {
    if (isOwner) {
      dispatch(clearPosts());
      dispatch(fetchPostsByUsername({ username }));
      dispatch(fetchFriends());
    }
  }, [dispatch, username, isOwner]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      dispatch(clearSearchResults());
    } else {
      dispatch(searchFriends(searchTerm));
    }
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      postLoading ||
      noMorePosts
    )
      return;

    dispatch(fetchPostsByUsername({ username, page: posts.length / 5 + 1 }));
  }, [dispatch, username, posts.length, postLoading, noMorePosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <Loading type="spin" color="#019444" height={50} width={50} />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <h2>User not found</h2>
      </div>
    );
  }

  const posts_tab_header = isOwner ? 'My Posts' : 'Posts';
  const tabs = [
    {
      label: posts_tab_header,
      content: (
        <div>
          {isOwner && (
            <div
              className="border-round p-3 flex align-items-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={user.profile_photo_url}
                alt="Profile"
                className="h-3rem w-3rem border-circle mr-3"
              />
              <p className="m-0 text-primary">Add new post...</p>
            </div>
          )}
          <div className="mt-2">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
          {postLoading && (
            <div className="flex justify-content-center align-items-center my-4">
              <Loading type="spin" color="#019444" height={30} width={30} />
            </div>
          )}
          {noMorePosts && <p className="text-center">No more posts</p>}
        </div>
      ),
    },
    {
      label: 'Friends',
      content: (
        <FriendsTab
          friends={searchResults.length > 0 ? searchResults : friends}
          onSearch={handleSearch}
        />
      ),
    },
  ];

  return (
    <div className="flex align-items-center flex-column">
      <ProfileHeader
        profile_photo_url={profileData.profile_photo_url}
        cover_photo_url={profileData.cover_photo_url}
        first_name={profileData.first_name}
        last_name={profileData.last_name}
        email={profileData.email}
        birthday={profileData.birthday}
        address={profileData.address}
        about={profileData.about}
        username={profileData.username}
        phone_number={profileData.phone_number}
        isOwner={isOwner}
        gender={profileData.gender}
      />
      <div className="flex flex-column sm:flex-row w-full md:w-10">
        <div className="sm:w-auto flex justify-content-center">
          <AboutSection />
        </div>
        <div className="w-full h-auto mt-2 ">
          <TabView tabs={tabs} />
        </div>
      </div>
      <AddPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
