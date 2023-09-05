import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  //create books
  const createBook = (newTitle) => {
    const updatedBooks = [
      ...books,
      { id: Math.round(Math.random() * 999), title: newTitle },
    ];
    setBooks(updatedBooks);
  };

  //delete books
  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <BookList books={books} onDelete={deleteBook} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
