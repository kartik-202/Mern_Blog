import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import themeReducer from './themes/themeslice';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer=combineReducers({
  user:userReducer,
  theme:themeReducer,
})

const persistConfig = {
  key:'root',
  storage,
  version:1,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare(
    {serializableCheck:false}
  ),
})

export const persistor=persistStore(store)