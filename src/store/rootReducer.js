import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import commentReducer from '../features/community/commentsSlice';
import friendsReducer from '../features/community/friendsSlice';
import postsReducer from '../features/community/postsSlice'; // Import the posts slice
import gardenReducer from '../features/garden/gardensSlice';
import plantReducer from '../features/plant/plantsSlice';
import timelinesReducer from '../features/plant/timelinesSlice';
import tutorialsReducer from '../features/tutorials/tutorialsSlice';
import uiReducer from '../features/ui/uiSlice';
import usersReducer from '../features/users/usersSlice';
import wateringReducer from '../features/watering/wateringSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  friends: friendsReducer,
  users: usersReducer,
  ui: uiReducer,
  comments: commentReducer,
  plants: plantReducer,
  gardens: gardenReducer,
  timelines: timelinesReducer,
  tutorials: tutorialsReducer,
  watering: wateringReducer,
});

export default rootReducer;
