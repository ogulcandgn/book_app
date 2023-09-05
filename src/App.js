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

  return (
    <div className="app">
      <BookList books={books} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
