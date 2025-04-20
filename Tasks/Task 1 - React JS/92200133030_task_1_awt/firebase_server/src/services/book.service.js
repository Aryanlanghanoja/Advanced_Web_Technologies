import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import { db } from "../config/firebase_connection.js";

// const bookCollectionRef = collection(db, "books");

export const createBook = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'books'), data);
    res.status(200).send('Book Created Successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const books = await getDocs(collection(db, 'books'));
    const bookArray = [];

    if (books.empty) {
      res.send('No Books found');
    } else {
      books.forEach((doc) => {
        const book = {
          id : doc.id,
          title : doc.data().title,
          author: doc.data().author,
          description : doc.data().description,
          date : doc.data().date,
        };
        bookArray.push(book);
      });
      console.log(bookArray)
      res.status(200).send(bookArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getBookbyID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const book = doc(db, 'books', id);
    const data = await getDoc(book);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const book = doc(db, 'books', id);
    await updateDoc(book, data);
    res.status(200).send('Book updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'books', id));
    res.status(200).send('Book deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};