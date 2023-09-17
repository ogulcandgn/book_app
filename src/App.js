import axios from "axios";
import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  //sayfa yüklendiğinde kayıtlı olan kitapları çağırır
  const fetchBooks = async () => {
    const responce = await axios.get("http://localhost:3001/books");
    setBooks(responce.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  //create books
  const createBook = async (newTitle) => {
    //api üzerinden verimizi gönderiyoruz
    const responce = await axios.post("http://localhost:3001/books", {
      title: newTitle,
    });

    const updatedBooks = [...books, responce.data];
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

  //edit books
  const editBook = async (id, newTitle) => {
    //sayfa reflesh olduğunda yaptığımız editler kalıcı olur
    const responce = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
    // console.log(responce);
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...responce.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading Book</h1>
      <BookList books={books} onDelete={deleteBook} onEdit={editBook} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
