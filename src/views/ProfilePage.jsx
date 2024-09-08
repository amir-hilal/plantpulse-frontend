import React, { useCallback, useEffect, useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TabView from '../components/common/TabView';
import UserCard from '../components/common/UserCard';
import AddPostModal from '../components/Posts/AddPostModal';
import PostCard from '../components/Posts/PostCard';
import AboutSection from '../components/Profile/AboutSection';
import FriendsTab from '../components/Profile/FriendsTab';
import ProfileHeader from '../components/Profile/ProfileHeader';

import {
  fetchFriendRequests,
  fetchFriendsByUsername,
  resetFriendsState,
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
  const postsLoading = useSelector((state) => state.posts.loading);
  const postLoading = useSelector((state) => state.posts.loading);
  const noMorePosts = useSelector((state) => state.posts.noMorePosts);
  const friends = useSelector((state) => state.friends.friends);
  const friendRequests = useSelector((state) => state.friends.friendRequests);
  const user = useSelector((state) => state.auth.userProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/show/${username}`);
        setProfileData(response.data);

        if (user && response.data && response.data.username === user.username) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };
    dispatch(clearPosts());
    dispatch(resetFriendsState());
    dispatch(fetchPostsByUsername({ username }));
    dispatch(fetchFriendsByUsername({ username }));
    if (isOwner) dispatch(fetchFriendRequests());
    fetchProfile();
  }, [username, user, dispatch, navigate, isOwner]);

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
                src={profileData.profile_photo_url}
                alt="Profile"
                className="h-3rem w-3rem border-circle mr-3"
              />
              <p className="m-0 text-primary">Add new post...</p>
            </div>
          )}
          <div className="mt-2 flex flex-column justify-content-center">
            {posts.length > 0
              ? posts.map((post) => <PostCard key={post.id} post={post} />)
              : !postsLoading && !!posts && <p>No posts yet.</p>}
          </div>
          {postLoading && (
            <div className="flex justify-content-center align-items-center my-4">
              <Loading type="spin" color="#019444" height={30} width={30} />
            </div>
          )}
          {noMorePosts && !loading && !posts && (
            <p className="text-center">No more posts</p>
          )}
        </div>
      ),
    },
    {
      label: 'Friends',
      content: <FriendsTab friends={friends} isOwner={isOwner} />,
    },
  ];

  if (isOwner) {
    tabs.push({
      label: (
        <div className="flex align-items-center">
          Friend Requests
          {friendRequests.length > 0 && (
            <span
              className="ml-2 bg-red-600 text-white border-circle  flex justify-content-center align-items-center text-sm"
              style={{ height: '20px', width: '20px' }}
            >
              {friendRequests.length}
            </span>
          )}
        </div>
      ),
      content: (
        <div>
          {friendRequests.length > 0 ? (
            friendRequests.map((request) => (
              <UserCard
                key={request.id}
                user={request.user}
                status={request.status}
                isOwner={isOwner}
              />
            ))
          ) : (
            <p className="text-center">No friend requests.</p>
          )}
        </div>
      ),
    });
  }

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
        relationship_status={profileData.relationship_status}
        user_id={profileData.id}
      />
      <div className="flex flex-column sm:flex-row w-full md:w-10">
        <div className="sm:w-auto flex justify-content-center">
          <AboutSection profileData={profileData} isOwner={isOwner} />
        </div>
        <div className="w-full h-auto mt-2 ml-2">
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
