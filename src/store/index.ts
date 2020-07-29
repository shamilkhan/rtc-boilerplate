import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  customerReducer,
} from './extra';
import { authSlice } from './entities/auth';

export type AppStore = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  customer: customerReducer
});


const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<AppStore>()] as const,
});

export default store;
