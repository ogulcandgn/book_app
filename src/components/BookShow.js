import { useState, useContext } from "react";
import BooksContext from "../context/context";
import BookEdit from "./BookEdit";

//başlangıçta edit sayfasının açılmasını istemediğimiz için default olarak false yapıyoruz
function BookShow({ book }) {
  const { deleteBook } = useContext(BooksContext);
  const [showEdit, setShowEdit] = useState(false);

  //delete click
  const handleDeleteClick = () => {
    deleteBook(book.id);
  };

  //edit click
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  //save butonuna bastığımız zaman edit alanının kapanıp yeni başlığın gözükmesini sağlar
  const handleSubmit = () => {
    setShowEdit(false);
  };

  let content = <h3>{book.title}</h3>;
  if (showEdit) {
    //book edit'de edit alanına tıkladığımızda input içerisinde varsayılan kitap adını görüntülemek için prop geçiyoruz
    content = <BookEdit book={book} showEdit={handleSubmit} />;
  }

  return (
    <div className="book-show">
      <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt="photos" />
      {content}
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
