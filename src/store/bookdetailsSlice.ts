import { createSlice } from "@reduxjs/toolkit";

type bookdetailsType = {
  id: string;
  authorName: string;
  coverPic: string;
  title: string;
  readStatus: string;
  rating: number;
  aboutAuthor: string;
  aboutBook: string;
};

export type bookdetailsStateType = {
  details: bookdetailsType | null;
};

const initialState: bookdetailsStateType = { details: null };

const bookdetailsSlice = createSlice({
  name: "bookdetails",
  initialState,
  reducers: {
    setBookDetails(state, action) {
      state.details = action.payload;
    },
  },
});

export const bookdetailsActions = bookdetailsSlice.actions;
export default bookdetailsSlice.reducer;
