import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import homeReducer from "./homeSlice";
import bookshelvesReducer from "./bookshelvesSlice";
import bookdetailsReducer from "./bookdetailsSlice";


const store = configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
    bookshelves: bookshelvesReducer,
    bookdetails: bookdetailsReducer
  },
});

export default store;
