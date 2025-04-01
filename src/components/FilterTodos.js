import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const FilterTodos = () => {
    const { filter, setFilter } = useContext(TodoContext);

    return (
        <div className="filter-container">
            <button 
                className={`filter-btn ${filter === "all" ? "active" : ""}`} 
                onClick={() => setFilter("all")}
            >
                All
            </button>
            <button 
                className={`filter-btn ${filter === "completed" ? "active" : ""}`} 
                onClick={() => setFilter("completed")}
            >
                Completed
            </button>
            <button 
                className={`filter-btn ${filter === "pending" ? "active" : ""}`} 
                onClick={() => setFilter("pending")}
            >
                Pending
            </button>
        </div>
    );
};

export default FilterTodos;
