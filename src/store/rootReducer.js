import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import postsReducer from '../features/community/postsSlice'; // Import the posts slice
import friendsReducer from '../features/community/friendsSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    friends: friendsReducer,
    ui: uiReducer,
});

export default rootReducer;
