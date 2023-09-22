import { useState, useContext } from "react";
import BooksContext from "../context/context";

function BookEdit({ book, showEdit }) {
  const { editBook } = useContext(BooksContext);
  const [title, setTitle] = useState(book.title);

  //input değerini alıyoruz
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  //form'u göndermek için
  const handleSubmit = (e) => {
    e.preventDefault();
    showEdit();
    editBook(book.id, title);
  };

  return (
    <div>
      <form className="book-edit" onSubmit={handleSubmit}>
        <label>Title</label>
        <input className="input" value={title} onChange={handleChange} />
        <button className="button is-primary">Save</button>
      </form>
    </div>
  );
}

export default BookEdit;
