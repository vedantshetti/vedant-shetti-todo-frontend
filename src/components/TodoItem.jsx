import { useState } from "react";
import { TodoService } from "../services/todoService";

function TodoItem({ todo, loadTodos, setDeleteTodo, selectedTodos, handleSelectTodo }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleUpdate = async () => {
        await TodoService.updateTodo(todo.id, {
            title, description
        })

        setEditing(false);
        loadTodos();

    };

    const handleStatusChange = async (e) => {

        await TodoService.updateTodo(todo.id, { status: e.target.value });
        loadTodos();

    };

    const handleDelete = async () => {

        await TodoService.deleteTodo(todo.id);
        loadTodos();

    };

    const getStatusBadgeClass = (status) => {
        const baseClass = "status-badge";
        switch (status) {
            case 'completed': return `${baseClass} status-completed`;
            case 'in-progress': return `${baseClass} status-in-progress`;
            case 'on-hold': return `${baseClass} status-on-hold`;
            default: return baseClass;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'completed': return 'completed';
            case 'in-progress': return 'in-progress';
            case 'on-hold': return 'on-hold';
            default: return status;
        }
    };

    return (
        <div className="todo-item" data-status={todo.status}>


            <div className="todo-left">
                <input
                    type="checkbox"
                    checked={selectedTodos.includes(todo.id)}
                    onChange={(e) => handleSelectTodo(todo.id)}
                />

                {editing ? (
                    <div className="edit-form">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                        <button onClick={handleUpdate} className="save-btn">Save</button>
                        <button onClick={() => setEditing(false)} className="cancel-edit-btn">Cancel</button>
                    </div>
                ) : (

                    <div className="todo-content">
                        <div className="todo-title">{todo.title}</div>
                        {todo.description && (
                            <div className="todo-desc">{todo.description}</div>
                        )}
                    </div>


                )}
            </div>




            <div className="todo-right">
                <div className={getStatusBadgeClass(todo.status)}>
                    {getStatusLabel(todo.status)}
                    <select
                        value={todo.status}
                        onChange={handleStatusChange}
                        className="status-dropdown"
                    >
                        <option value="completed">completed</option>
                        <option value="on-hold">on-hold</option>
                        <option value="in-progress">in-progress</option>
                    </select>
                </div>

                <div className="todo-actions">
                    <button className="icon-btn edit-btn" onClick={() => setEditing(true)}>
                       edit
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => { setDeleteTodo(todo) }}>
                        delete
                    </button>
                </div>



            </div>
        </div>
    );

}

export default TodoItem;