# Todo List App using React Context API

## 📌 Introduction
This is a **simple Todo List application** built using **React and Context API** for state management. It allows users to **add, edit, and delete tasks** while managing state globally without using Redux.

## 🚀 Features
- ✅ **Add New Todos**
- ✏️ **Edit Existing Todos**
- 🗑️ **Delete Todos**
- 📂 **State Management with Context API**
- 🎨 **Basic Styling (CSS)**

---

## 📂 Project Structure
```
📦 todolist-withcontextapi
├── 📁 src
│   ├── 📁 components
│   │   ├── 📄 TodoForm.js    # Input form to add new tasks
│   │   ├── 📄 TodoList.js    # Displays all todos
│   │   ├── 📄 TodoItem.js    # Individual todo item (edit & delete)
│   ├── 📁 context
│   │   ├── 📄 TodoContext.js  # Global state management
│   ├── 📄 App.js         # Main component
│   ├── 📄 index.js       # Entry point
│   ├── 📄 styles.css     # App styling
├── 📄 package.json       # Dependencies & scripts
```

---

## 🛠️ Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/todolist-withcontextapi.git
cd todolist-withcontextapi
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the application
```bash
npm start
```
The app will run on `http://localhost:3000/`

---

## 🔧 Code Explanation

### **1️⃣ Context API for State Management (`TodoContext.js`)**
```jsx
import React, { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    // Add a new todo
    const addTodo = (text) => {
        if (text.trim() !== "") {
            const newTodo = { id: Date.now(), text };
            setTodos([...todos, newTodo]);
        }
    };

    // Edit a todo
    const editTodo = (id, newText) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    // Remove a todo
    const removeTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, editTodo, removeTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
```

### **2️⃣ Todo Input Form (`TodoForm.js`)**
```jsx
import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = () => {
    const [text, setText] = useState("");
    const { addTodo } = useContext(TodoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(text);
        setText(""); // Clear input field
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <button type="submit">Add</button>
        </form>
    );
};
export default TodoForm;
```

### **3️⃣ Todo List Display (`TodoList.js`)**
```jsx
import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { todos } = useContext(TodoContext);

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};
export default TodoList;
```

### **4️⃣ Individual Todo Item (`TodoItem.js`)**
```jsx
import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
    const { editTodo, removeTodo } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && newText.trim() !== "") {
            editTodo(todo.id, newText.trim());
        }
        setIsEditing(!isEditing);
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEdit()}
                    autoFocus
                />
            ) : (
                <span>{todo.text}</span>
            )}
            <div className="todo-actions">
                <button className="edit-btn" onClick={handleEdit}>
                    {isEditing ? "Save" : "Edit"}
                </button>
                <button className="delete-btn" onClick={() => removeTodo(todo.id)}>
                    Delete
                </button>
            </div>
        </li>
    );
};
export default TodoItem;
```

---

## 🎨 Styling (`styles.css`)
```css
.todo-list {
    list-style-type: none;
    padding: 0;
}
.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #f4f4f4;
    margin: 5px 0;
    border-radius: 5px;
}
.edit-btn, .delete-btn {
    margin-left: 5px;
    cursor: pointer;
}
```

---

## 🏁 Conclusion
This **Todo List App** demonstrates how to use **Context API for state management** in React. You can **add, edit, and delete tasks** efficiently while keeping state centralized.

Enjoy coding! 🚀

