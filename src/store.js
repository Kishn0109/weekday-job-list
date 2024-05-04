import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobs/jobSlice";
export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
