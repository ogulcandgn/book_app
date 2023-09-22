import { createContext, useState, axios } from "react";

const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  //sayfa yüklendiğinde kayıtlı olan kitapları çağırır
  const fetchBooks = async () => {
    const responce = await axios.get("http://localhost:3001/books");
    setBooks(responce.data);
  };

  //edit books
  const editBook = async (id, newTitle) => {
    //sayfa reflesh olduğunda yaptığımız editler kalıcı olur
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
  };

  //delete books
  const deleteBook = async (id) => {
    //sayfa reflesh olduğunda sildiğimiz booklar kalıcı olarak silinir
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  //create books
  const createBook = async (newTitle) => {
    //api üzerinden verimizi gönderiyoruz
    const responce = await axios.post("http://localhost:3001/books", {
      title: newTitle,
    });

    const updatedBooks = [...books, responce.data];
    setBooks(updatedBooks);
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
