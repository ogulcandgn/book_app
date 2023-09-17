import { createContext, useState } from "react";

const BooksContext = createContext();

const Provider = ({ children }) => {
  const [count, setCount] = useState(5);

  //diğer componentlerle paylaşacağımız bileşen
  const valueToShare = {
    count: count,
    incrementCount: () => {
      setCount(count + 1);
    },
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
};

export { Provider };
export default BooksContext;
