import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  authReducer,
  customerReducer,
 } from './extra';

export type AppStore = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer
});


const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<AppStore>()] as const,
});

export default store;
