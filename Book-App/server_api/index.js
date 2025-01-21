const express = require("express");
const app = express();
const port = 3000;
var books = [
  {
    id: 1,
    title: "Unknown",
    author: "Me Only",
    price: 500,
    pub_name: "Pata nahi",
    pub_year: 2025,
  },
];

app.use(express.json());

// To Fetch the Boooks
app.get("/", (req, res) => res.json(books));

// To Fetch a Single Book based on ID

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id == id);
  if (!book)  res.send("No such book found");
  res.json(book);
});

// To Search Books based on Title

app.get("/search", (req, res) => {
  const title = req.query.title;
  const foundBooks = books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
  if (foundBooks.length === 0) res.send("No such book found");
  res.json(foundBooks);
});

// To Search Books based on Author

app.get("/author", (req, res) => {
  const author = req.query.author;
  const foundBooks = books.filter((book) => book.author.toLowerCase().includes(author.toLowerCase()));
  if (foundBooks.length === 0) res.send("No such book found");
  res.json(foundBooks);
});


// To Add a New Book

app.post("/", (req, res) => {

  const {id, title, author, price, publisher_name, publisher_year} = req.body ;
  books = [...books, {id, title, author , price, publisher_name, publisher_year}];
  res.json(books);
});

// To Update the Book based on ID

app.put("/:id", (req, res) => {
    const id = req.params.id ;
    const {title, author, price, publisher_name, publisher_year} = req.body ;
    books = books.map(book => book.id == id ? {id ,title, author, price, publisher_name, publisher_year} : book);
    res.json(books);
  });

// To Delete the Book based on ID

app.delete("/:id", (req, res) => {
    const id = req.params.id ;
    books = books.filter((book) => book.id != id);
    res.json(books);
  });

app.listen(port, () =>
  console.log(` server started on http://localhost:${port} !`)
);
