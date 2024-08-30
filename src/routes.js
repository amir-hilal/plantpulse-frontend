const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  myGardens: '/my-gardens',
  tutorials: '/tutorials',
  flora: '/flora',
  calendar: '/calendar',
  community_feed: '/community/feed',
  community_chats: '/community/chats',
  profile: (username = ':username') => `/profile/${username}`,
  notFound: '*', // Fallback route for 404
};

export default routes;
