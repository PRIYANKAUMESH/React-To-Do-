import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    addTodo,
    deleteTodo,
    editTodo
} from "./features/todo/todoSlice";

import "./App.css";

function App() {

    const [input, setInput] = useState("");
    const [editId, setEditId] = useState(null);

    const todos = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    // Add and Update
    const handleSubmit = () => {

        if (input.trim() === "") return;

        if (editId !== null) {
            dispatch(editTodo({
                id: editId,
                text: input
            }));

            setEditId(null);
        } else {
            dispatch(addTodo(input));
        }

        setInput("");
    };

    // Edit
    const handleEdit = (todo) => {
        setInput(todo.text);
        setEditId(todo.id);
    };

    // Delete
    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div className="container">

            <h1>Redux Todo App</h1>

            <div className="input-box">

                <input
                    type="text"
                    placeholder="Enter todo..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    {editId !== null ? "Update" : "Add"}
                </button>

            </div>

            <ul>
                {todos.map((todo) => (

                    <li key={todo.id}>

                        <span>{todo.text}</span>

                        <div>
                            <button
                                className="edit"
                                onClick={() => handleEdit(todo)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete"
                                onClick={() => handleDelete(todo.id)}
                            >
                                Delete
                            </button>
                        </div>

                    </li>

                ))}
            </ul>

        </div>
    );
}

export default App;