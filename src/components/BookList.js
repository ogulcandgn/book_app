import { useContext } from "react";
import BooksContext from "../context/context";
import BookShow from "./BookShow";

function BookList({ books, onDelete, onEdit }) {
  const { count, incrementCount } = useContext(BooksContext);

  const renderedBooks = books.map((book) => {
    return (
      <BookShow key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />
    );
  });
  return (
    <div className="book-list">
      {renderedBooks}
      {count}
      <button onClick={incrementCount}>Click!</button>
    </div>
  );
}

export default BookList;
