const routes = {
  landing: '/',
  home:'/home',
  login: '/login',
  register: '/register',
  myGardens: '/my-gardens',
  PlantDetailsPage: (id = 'id') => `/my-gardens/plant/${id}`,
  tutorials: '/tutorials',
  tutorial_details: (id = 'id') => `/tutorials/${id}`,
  calendar: '/calendar',
  community_posts: '/community/posts',
  post_details: (id = 'id') => `/community/posts/${id}`,
  community_chats: '/community/chats',
  community_connect: '/community/connect',
  profile: (username = ':username') => `/profile/${username}`,
  notFound: '*', // Fallback route for 404
};

export default routes;
