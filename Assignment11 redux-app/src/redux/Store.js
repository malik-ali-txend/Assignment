import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { apiSlice } from './Slice';
import {persistConfig} from './config';

import { rootReducer } from './Reducers';





const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware), // Include RTK Query middleware
});

export const persistor = persistStore(store);
