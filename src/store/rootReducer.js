import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import friendsReducer from '../features/community/friendsSlice';
import postsReducer from '../features/community/postsSlice'; // Import the posts slice
import uiReducer from '../features/ui/uiSlice';
import usersReducer from '../features/users/usersSlice';
import commentReducer from '../features/community/commentsSlice';
import plantReducer from '../features/plant/plantsSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  friends: friendsReducer,
  users: usersReducer,
  ui: uiReducer,
  comments: commentReducer,
  plants: plantReducer
});

export default rootReducer;
