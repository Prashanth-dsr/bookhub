import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Spinner } from "@fluentui/react";
import Header from "./Header";
import Footer from "./Footer";
import {
  bookdetailsActions,
  bookdetailsStateType,
} from "../store/bookdetailsSlice";

const BookDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const bookdetails = useSelector(
    (state: { bookdetails: bookdetailsStateType }) => state.bookdetails.details
  );

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      };
      const pathList = location.pathname.split("/");
      const bookId = pathList[pathList.length];
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books/${bookId}`,
        options
      );
      const data = await response.json();
      data.books = data.books.map((book: any) => ({
        id: book.id,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        title: book.title,
        readStatus: book.read_status,
        rating: book.rating,
        aboutAuthor: book.about_author,
        aboutBook: book.about_book,
      }));
      dispatch(bookdetailsActions.setBookDetails(data.books));
    })();
  }, []);

  return (
    <div>
      <Header />
      {bookdetails ? (
        <div>
          <div></div>
          <hr />
          <h2>About Author</h2>
          <p></p>
          <h2>About Book</h2>
          <p></p>
        </div>
      ) : (
        <Spinner />
      )}
      <Footer />
    </div>
  );
};

export default BookDetails;
