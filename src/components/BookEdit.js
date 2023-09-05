import { useState } from "react";

function BookEdit({ book, onEdit, showEdit }) {
  const [title, setTitle] = useState(book.title);

  //input değerini alıyoruz
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  //form'u göndermek için
  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(book.id, title);
    showEdit();
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
