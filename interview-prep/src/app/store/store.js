// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      test: testReducer,
    },
    preloadedState,
  });
}
