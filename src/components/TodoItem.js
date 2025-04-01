import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
    const { editTodo, removeTodo } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && newText.trim() !== "") {
            editTodo(todo.id, newText.trim()); // Update todo text
        }
        setIsEditing(!isEditing); // Toggle edit mode
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEdit()} // Save on Enter
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
