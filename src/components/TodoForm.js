import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = () => {
    const [text, setText] = useState("");
    const { addTodo } = useContext(TodoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(text);
        setText(""); // Clear input field after adding
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
