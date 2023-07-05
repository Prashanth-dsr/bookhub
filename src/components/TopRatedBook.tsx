import { topRatedBook } from "../store/homeSlice";

const TopRatedBook:React. FC<{book: topRatedBook}> = ({book}) => {
    return <div>
        <img src={book.coverPic}/>
        <h2>{book.title}</h2>
        <p>{book.authorName}</p>
    </div>
}

export default TopRatedBook;