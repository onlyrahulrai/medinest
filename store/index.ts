import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage
}

const rootReducer = {
    auth:persistReducer(persistConfig, authReducer)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }), // Example: Disable serializable checks if necessary
  devTools: process.env.EXPO_PUBLIC_ENV !== 'production', // Enable Redux DevTools in development
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;