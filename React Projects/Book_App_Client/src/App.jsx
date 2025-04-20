import { createContext } from "react";
import Book from "./components/Book";
import Category from "./components/Category";
import CompOne from "./components/CompOne";

const nameContext = createContext();

function App() {

  const name = "Aryan Langhanoja";

  return (
    <>
      <div>
        <CompOne data = {name}/>
    </div>
    </>

  );
  // let books = [
  //   {
  //     cat_name: "Novel",
  //     items: [
  //       {
  //         title: "My First Book",
  //         author: "Yet searching",
  //         price: 500,
  //         pub_name: "None",
  //         pub_year: "2025",
  //       },
  //       {
  //         title: "My Second Book",
  //         author: "Yet searching",
  //         price: 800,
  //         pub_name: "None",
  //         pub_year: "2025",
  //       },
  //     ],
  //   },
  //   {
  //     cat_name: "Drama",
  //     items: [
  //       {
  //         title: "My First Drama Book",
  //         author: "Yet searching",
  //         price: 500,
  //         pub_name: "None",
  //         pub_year: "2025",
  //       },
  //       {
  //         title: "My Second Book",
  //         author: "Yet searching",
  //         price: 800,
  //         pub_name: "None",
  //         pub_year: "2025",
  //       },
  //     ],
  //   },
  // ];
  // return (
  //   <>
  //     {books.map((cat) => (
  //       <Category cat_details={cat} />
  //     ))}
  //   </>
  // );
}

export default App;
