import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import friendsReducer from '../features/community/friendsSlice';
import postsReducer from '../features/community/postsSlice'; // Import the posts slice
import uiReducer from '../features/ui/uiSlice';
import usersReducer from '../features/users/usersSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  friends: friendsReducer,
  users: usersReducer,
  ui: uiReducer,
});

export default rootReducer;
