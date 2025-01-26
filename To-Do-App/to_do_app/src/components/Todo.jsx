// import React, { useState } from "react";

// const Todo = () => {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState("My Todo");
//   const handleAdd = () => {
//     console.log("button cliced");
//     setTodos([
//       ...todos,
//       { id: todos.length + 1, title: title, isCompleted: true },
//     ]);
//     setTitle("");
//   };
//   const handleCompleteToggle = (id) => {
//     const newList = todos.map((todo) =>
//       todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
//     );
//     setTodos(newList);
//   };
//   return (
//     <>
//       {/* add todo  */}
//       <div>
//         <input
//           type="text"
//           placeholder="Enter todo"
//           value={title}
//           onChange={(e) => {
//             setTitle(e.target.value);
//           }}
//         />
//         <input type="button" value="Add" onClick={handleAdd} />
//       </div>
//       {/* display todo */}
//       {todos.map((todo) => (
//         <div>
//           <input
//             type="checkbox"
//             name="isCompleted"
//             onChange={(e) => handleCompleteToggle(todo.id)}
//             checked={todo.isCompleted}
//           />
//           {todo.title}
//           <input type="button" name="btnEdit" value="edit" />
//           <input type="button" name="btnDelete" value="delete" />
//         </div>
//       ))}
//     </>
//   );
// };

// export default Todo;

import  { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      setTodos([
        ...todos,
        { id: todos.length + 1, title: title, isCompleted: false },
      ]);
      setTitle("");
    } else {
      console.log("Title is empty");
    }
  };

  const handleCompleteToggle = (id) => {
    const newList = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newList);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="button" value="Add" onClick={handleAdd} />
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            onChange={() => handleCompleteToggle(todo.id)}
            checked={todo.isCompleted}
          />
          {todo.title}
          <input type="button" name="btnEdit" value="edit" />
          <input type="button" name="btnDelete" value="delete" />
        </div>
      ))}
    </>
  );
};

export default Todo;
