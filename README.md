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

## 📖 Additional Explanation

### Why Use Context API?
The Context API is a powerful feature in React that allows you to share state across components without the need to pass props manually at every level. In this project, the Context API is used to manage the state of the todo list globally, making the code cleaner and more maintainable compared to prop drilling.

### Key Benefits of Context API in This Project:
1. **Centralized State Management**: All todos are stored in a single context (`TodoContext`), making it easy to access and update them from any component.
2. **Simplified Code**: No need to pass props through multiple layers of components.
3. **Scalability**: As the app grows, adding new features or components becomes easier since the state is managed in one place.

### Component Breakdown
- **`TodoForm`**: Handles user input and adds new todos to the list. It uses the `addTodo` function from the context to update the global state.
- **`TodoList`**: Displays all the todos by mapping over the `todos` array from the context.
- **`TodoItem`**: Represents a single todo item. It allows editing and deleting of todos using the `editTodo` and `removeTodo` functions from the context.

### How State Updates Work
1. **Adding a Todo**: When a user submits the form in `TodoForm`, the `addTodo` function is called, which updates the `todos` array in the context.
2. **Editing a Todo**: In `TodoItem`, the `editTodo` function is triggered when the user saves changes to a todo. This updates the specific todo in the `todos` array.
3. **Deleting a Todo**: The `removeTodo` function filters out the selected todo from the `todos` array, effectively removing it.

### Styling Overview
The app uses basic CSS for styling. The focus is on simplicity and readability:
- **Todo List**: Styled as a clean, minimalistic list with rounded corners and subtle background colors.
- **Buttons**: Styled with hover effects to improve user experience.

### Potential Enhancements
Here are some ideas to extend the functionality of this app:
- **Add Due Dates**: Allow users to set deadlines for their tasks.
- **Mark as Completed**: Add a feature to mark tasks as completed and visually differentiate them.
- **Persistent Storage**: Use local storage or a backend API to save todos so they persist across sessions.
- **Search and Filter**: Add a search bar or filters to find specific tasks quickly.

By implementing these features, you can further enhance the usability and functionality of the app.

---

Feel free to explore and customize the app to suit your needs. Happy coding! 🎉
## 🌟 Additional Features

### **5️⃣ Mark Todos as Completed**
```jsx
// Updated TodoContext.js
const toggleComplete = (id) => {
    setTodos((prevTodos) =>
        prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
};

// Add toggleComplete to the context provider
<TodoContext.Provider value={{ todos, addTodo, editTodo, removeTodo, toggleComplete }}>
    {children}
</TodoContext.Provider>;
```

```jsx
// Updated TodoItem.js
const { toggleComplete } = useContext(TodoContext);

return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
        />
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
```

### **6️⃣ Persistent Storage with Local Storage**
```jsx
// Updated TodoContext.js
import { useEffect } from "react";

useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
}, []);

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

### **7️⃣ Search and Filter Todos**
```jsx
// New SearchBar.js
import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { todos } = useContext(TodoContext);

    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="todo-list">
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
```

### **8️⃣ Due Dates for Todos**
```jsx
// Updated TodoForm.js
const [dueDate, setDueDate] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ text, dueDate });
    setText("");
    setDueDate("");
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
        <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
    </form>
);
```

### **9️⃣ Dark Mode**
```jsx
// New ThemeContext.js
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
```

```jsx
// Updated App.js
import { ThemeContext } from "./context/ThemeContext";

const { isDarkMode, toggleTheme } = useContext(ThemeContext);

return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <button onClick={toggleTheme}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <TodoForm />
        <TodoList />
    </div>
);
```

```css
/* Updated styles.css */
body.dark-mode {
    background-color: #121212;
    color: #ffffff;
}
body.light-mode {
    background-color: #ffffff;
    color: #000000;
}
```

--- 

These enhancements make the app more functional and user-friendly. 🎉