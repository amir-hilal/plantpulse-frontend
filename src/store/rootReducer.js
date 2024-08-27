import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice'; 

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
});

export default rootReducer;
