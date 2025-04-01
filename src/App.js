import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterTodos from "./components/FilterTodos";
import "./styles.css";  // Import global styles

function App() {
    return (
        <TodoProvider>
            <div className="app-container">
                <h1>Todo List</h1>
                <TodoForm />
                <FilterTodos />
                <TodoList />
            </div>
        </TodoProvider>
    );
}

export default App;
