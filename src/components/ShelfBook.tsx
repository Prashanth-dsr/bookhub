import { useNavigate } from "react-router-dom";
import { shelfBook } from "../store/bookshelvesSlice";

const ShelfBook: React.FC<{ book: shelfBook }> = ({ book }) => {
  const navigate = useNavigate();
  const { id, authorName, coverPic, title, readStatus, rating } = book;

  return (
    <div onClick={() => navigate(`/bookdetails/${id}`)}>
      <img src={coverPic} />
      <div>
        <h3>{title}</h3>
        <p>{authorName}</p>
        <p>Avg Rating 🌟 {rating}</p>
        <p>
          Status: <span>{readStatus}</span>
        </p>
      </div>
    </div>
  );
};

export default ShelfBook;
