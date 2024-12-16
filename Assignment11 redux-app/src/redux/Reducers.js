import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./Slice";
import Slice from './Slice'





export const rootReducer = combineReducers({
  data: Slice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});