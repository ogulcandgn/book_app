import { useContext } from "react";
import BooksContext from "../context/context";

function useBookContext() {
  return useContext(BooksContext);
}

export default useBookContext;
