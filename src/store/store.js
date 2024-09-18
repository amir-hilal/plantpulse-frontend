import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import logger from "redux-logger";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddlware) => {
        return getDefaultMiddlware().concat(logger);
      },
});

export default store;
