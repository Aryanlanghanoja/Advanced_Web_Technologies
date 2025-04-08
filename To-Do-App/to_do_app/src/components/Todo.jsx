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
  const [selected_id , set_selected_id] = useState(0);

  const handleAdd = () => {

    if (selected_id == 0 && title.trim() != "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, title: title, isCompleted: false },
      ]);
      setTitle("");
      console.log("Todo added")
    } else if (selected_id != 0 && title.trim() != "") {
      const updatedTodos = todos.map(todo => todo.id == selected_id? {...todo, title: title} : todo);
      setTodos(updatedTodos);
      console.log("Todo Updated")
    }

    setTitle("");
  };

  const handleCompleteToggle = (id) => {
    const newList = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newList);
  };

  const handleEdit = (id) => {
    // TODO: Implement editing functionality
    console.log(`Editing todo with id: ${id}`);
    const selected_todo = todos.find(todo =>todo.id == id);
    setTitle(selected_todo.title);
    set_selected_id(0);
  };

  const handleDelete = (id) => {
    // TODO: Implement deleting functionality
    console.log(`Deleting todo with id: ${id}`);
    setTodos(todos.filter(todo => todo.id != id));
  }

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
          <input type="button" name="btnEdit" value="edit"  onClick={() => handleEdit(todo.id)}/>
          <input type="button" name="btnDelete" value="delete" onClick={() => handleDelete(todo.id)}/>
        </div>
      ))}
    </>
  );
};

export default Todo;

// Reference

// import React, { useState } from "react";

// const Todo = () => {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState("My Todo");
//   const [selId, setSelId] = useState(0);
//   const handleAdd = () => {
//     console.log("button cliced");
//     if (selId == 0) {
//       //logic to add
//       setTodos([
//         ...todos,
//         { id: todos.length + 1, title: title, isCompleted: true },
//       ]);
//     } else {
//       //logic to update
//       const newTodos = todos.map((todo) =>
//         todo.id == selId ? { ...todo, title: title } : todo
//       );
//       setTodos(newTodos);
//       setSelId(0);
//     }

//     setTitle("");
//   };
//   const handleCompleteToggle = (id) => {
//     const newList = todos.map((todo) =>
//       todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
//     );
//     setTodos(newList);
//   };
//   const handleEdit = (id) => {
//     console.log("from handleEdit");

//     const selTodo = todos.find((todo) => todo.id == id);
//     setTitle(selTodo.title);
//     setSelId(id);
//   };
//   const handleDelete = (id) => {
//     setTodos(todos.filter((todo) => todo.id != id));
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
//         <div key={todo.id}>
//           <input
//             type="checkbox"
//             name="isCompleted"
//             onChange={(e) => handleCompleteToggle(todo.id)}
//             checked={todo.isCompleted}
//           />
//           {todo.title}
//           <input
//             type="button"
//             name="btnEdit"
//             value="edit"
//             onClick={(e) => handleEdit(todo.id)}
//           />
//           <input
//             type="button"
//             name="btnDelete"
//             value="delete"
//             onClick={(e) => handleDelete(todo.id)}
//           />
//         </div>
//       ))}
//     </>
//   );
// };

// export default Todo;
