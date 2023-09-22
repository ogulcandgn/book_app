import { createContext, useState } from "react";
import axios from "axios";
const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  //sayfa yüklendiğinde kayıtlı olan kitapları çağırır
  const fetchBooks = async () => {
    try {
      const responce = await axios.get("http://localhost:3001/books");
      setBooks(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  //edit books
  const editBook = async (id, newTitle) => {
    //sayfa reflesh olduğunda yaptığımız editler kalıcı olur
    try {
      const responce = await axios.put(`http://localhost:3001/books/${id}`, {
        title: newTitle,
      });

      const updatedBooks = books.map((book) => {
        if (book.id === id) {
          return { ...book, ...responce.data };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (err) {
      console.log(err);
    }
  };

  //delete books
  const deleteBook = async (id) => {
    //sayfa reflesh olduğunda sildiğimiz booklar kalıcı olarak silinir
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);

      const updatedBooks = books.filter((book) => {
        return book.id !== id;
      });
      setBooks(updatedBooks);
    } catch (err) {
      console.log(err);
    }
  };

  //create books
  const createBook = async (newTitle) => {
    console.log(newTitle);
    //api üzerinden verimizi gönderiyoruz
    const tempVar = JSON.stringify(newTitle);
    try {
      const responce = await axios.post("http://localhost:3001/books", {
        title: tempVar,
      });

      const updatedBooks = [...books, responce.data];
      setBooks(updatedBooks);
    } catch (err) {
      console.log(err);
    }
  };

  const sharedValues = {
    fetchBooks,
    editBook,
    deleteBook,
    createBook,
    books,
  };

  return (
    <BooksContext.Provider value={sharedValues}>
      {children}
    </BooksContext.Provider>
  );
};

export { Provider };
export default BooksContext;
