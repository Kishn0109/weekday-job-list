import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jdList: [],
  totalCount: 0,
};
export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    add: (state, action) => {
      const jobs = action.payload;
      state.jdList = state.jdList.concat(jobs);
    },
  },
});

// Action creators are generated for each case reducer function
export const {  } = jobSlice.actions;

export default jobSlice.reducer;
