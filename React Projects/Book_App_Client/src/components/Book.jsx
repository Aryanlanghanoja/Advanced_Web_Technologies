import React from 'react';

const Book = ({details}) => {
  return (
    <div style={{display : "inline-block" , margin: 20 , padding : 10 , border : "1px solid black"}}>
      <h3>Title :- {details.title}</h3>
      <h5>Author :- {details.author}</h5>
      <p>Price :- {details.price}</p>
      <p>Publication Name :- {details.pub_name}</p>
      <p>Publication Year :- {details.pub_year}</p>
    </div>
  );
}

export default Book
