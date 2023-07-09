import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, Spinner } from "@fluentui/react";
import Cookies from "js-cookie";
import Slider from "react-slick";
import { homeActions, homeObj } from "../store/homeSlice";
import Header from "./Header";
import Footer from "./Footer";
import TopRatedBook from "./TopRatedBook";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Home.css"

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topRatedBooks = useSelector(
    (state: { home: homeObj }) => state.home.topRatedBooks
  );

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      };
      const response = await fetch(
        "https://apis.ccbp.in/book-hub/top-rated-books",
        options
      );
      const data = await response.json();
      data.books = data.books.map((book: any) => ({
        id: book.id,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        title: book.title,
      }));
      dispatch(homeActions.setTopRatedBooks(data.books));
    })();
  }, []);

  return (
    <div className="home">
      <Header />
      <div>
        <h1>Find Your Next Favorite Books?</h1>
        <p>
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div>
          <div>
            <h2>Top Rated Books</h2>
            <PrimaryButton
              className="find-books-btn"
              text="Find Books"
              onClick={() => navigate("/bookshelves")}
            />
          </div>
          {topRatedBooks.length ? (
            <Slider slidesToShow={3} dots>
              {topRatedBooks.map((book) => (
                <TopRatedBook key={book.id} book={book} />
              ))}
            </Slider>
          ) : (
            <Spinner />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
