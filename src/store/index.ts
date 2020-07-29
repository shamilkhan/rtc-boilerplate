import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { slice as authSlice } from './entities/auth';
import { customerSlice } from './entities/customers';

export type AppStore = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  customer: customerSlice.reducer
});


const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<AppStore>()] as const,
});

export default store;
