import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { SearchBox } from "@fluentui/react";
import {
  bookshelfNames,
  bookshelvesActions,
  bookshelvesObj,
} from "../store/bookshelvesSlice";
import ShelfBook from "./ShelfBook";

const BookShelves = () => {
  const dispatch = useDispatch();

  const bookshelves = useSelector(
    (state: { bookshelves: bookshelvesObj }) => state
  );
  console.log(bookshelves);

  const bookshelvesState = useSelector(
    (state: { bookshelves: bookshelvesObj }) => state.bookshelves
  );
  console.log(bookshelvesState);

  const { bookshelfName, searchText, bookList } = bookshelvesState;

  const tabHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.target as HTMLButtonElement;
    dispatch(bookshelvesActions.setBookshelfName(target.value));
  };

  const searchHandler = (text: any) => {
    dispatch(bookshelvesActions.setSearchText(text));
  };

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      };
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`,
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
      }));
      dispatch(bookshelvesActions.setBookList(data.books));
    })();
  }, [bookshelfName]);

  return (
    <div>
      <div>
        <h2>Bookshelves</h2>
        <ul>
          {bookshelfNames.map((bookshelfName) => (
            <button type="button" value={bookshelfName} onClick={tabHandler}>
              {bookshelfName}
            </button>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <h2>All Books</h2>
          <SearchBox placeholder="search" onSearch={searchHandler} />
        </div>
        <div>
          {bookList.map((book) => (
            <ShelfBook key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookShelves;
