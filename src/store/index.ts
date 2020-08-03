import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { slice as authSlice } from './entities/auth';
import { slice as customerSlice } from './entities/customers';
import {slice as paginationCollection } from './entities/paginationCollection';

export type AppStore = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;

export type ReducersKeys = keyof typeof reducers;

const reducers = {
  auth: authSlice.reducer,
  customers: customerSlice.reducer,
  paginationCollection: paginationCollection.reducer
};

const rootReducer = combineReducers(reducers);


const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<AppStore>()] as const,
});

export default store;
