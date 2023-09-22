import { useState, useContext } from "react";
import BooksContext from "../context/context";

function BookCreate() {
  const { createBook } = useContext(BooksContext);
  const [title, setTitle] = useState([]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBook(title);
    //submit olduğunda input value sıfırlanır
    setTitle("");
  };

  return (
    <div className="book-create">
      <h3>Add a Book</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          className="input"
          value={title}
          onChange={handleChange}
          title={title}
        />
        <button className="button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default BookCreate;
