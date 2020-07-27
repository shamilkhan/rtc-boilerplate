import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  authReducer,
 } from './extra';

export type AppStore = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<AppStore>()] as const,
});

type AppStore2 = ReturnType<typeof store.getState>;

type UserData = AppStore2["auth"]["data"];

export default store;
