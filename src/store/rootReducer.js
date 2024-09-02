import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import postsReducer from '../features/community/postsSlice'; // Import the posts slice

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    ui: uiReducer,
});

export default rootReducer;
