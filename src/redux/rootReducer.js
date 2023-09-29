import { combineReducers } from '@reduxjs/toolkit';
import { api } from '../services/api';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export default rootReducer;