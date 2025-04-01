import React, { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    // Add Todo
    const addTodo = (text) => {
        if (text.trim() !== "") {
            const newTodo = { id: Date.now(), text };
            setTodos([...todos, newTodo]);
        }
    };

    // Edit Todo
    const editTodo = (id, newText) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    // Remove Todo
    const removeTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, editTodo, removeTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
