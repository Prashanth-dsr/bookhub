import { topRatedBook } from "../store/homeSlice";
import "../css/TopRatedBook.css";

const TopRatedBook:React. FC<{book: topRatedBook}> = ({book}) => {
    return <div className="top-rated-book">
        <img src={book.coverPic}/>
        <h2>{book.title}</h2>
        <p>{book.authorName}</p>
    </div>
}

export default TopRatedBook;