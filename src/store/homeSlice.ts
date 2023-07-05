import { createSlice } from "@reduxjs/toolkit";

export type topRatedBook = {
  id: string;
  authorName: string;
  coverPic: string;
  title: string;
};

export type homeObj = {
  topRatedBooks: topRatedBook[];
};

const initialState: homeObj = {
  topRatedBooks: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setTopRatedBooks(state, actions) {
      state.topRatedBooks = actions.payload;
    },
  },
});

export const homeActions = homeSlice.actions;
export default homeSlice.reducer;
