import { createSlice } from "@reduxjs/toolkit";

export const bookshelfNames = [
  "All",
  "Read",
  "Currently Reading",
  "Want to Read",
];

export type shelfBook = {
  id: string;
  title: string;
  readStatus: string;
  rating: number;
  authorName: string;
  coverPic: string;
};

export type bookshelvesObj = {
  bookshelfName: string;
  searchText: string;
  bookList: shelfBook[];
};

const initialState: bookshelvesObj = {
  bookshelfName: bookshelfNames[0],
  searchText: "",
  bookList: [],
};

const bookshelvesSlice = createSlice({
  name: "bookshelves",
  initialState,
  reducers: {
    setBookshelfName(state, action) {
      state.bookshelfName = action.payload;
    },
    setBookList(state, action) {
      state.bookList = action.payload;
    },
    setSearchText(state, action) {
        state.searchText = action.payload
    } 
  },
});

export const bookshelvesActions = bookshelvesSlice.actions;
export default bookshelvesSlice.reducer;
