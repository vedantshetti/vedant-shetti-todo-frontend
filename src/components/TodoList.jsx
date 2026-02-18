import { useRef, useState } from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, loadTodos, setDeleteTodo, selectedTodos, handlSelectTodo, onReorder }) {
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const [draggingId, setDraggingId] = useState(null);
    const [dragOverId, setDragOverId] = useState(null);

    const handleDragStart = (e, index, id) => {
        dragItem.current = index;
        setDraggingId(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnter = (e, index, id) => {
        e.preventDefault();
        dragOverItem.current = index;
        setDragOverId(id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (dragItem.current === null || dragOverItem.current === null) return;
        if (dragItem.current === dragOverItem.current) {
            setDraggingId(null);
            setDragOverId(null);
            return;
        }

        const reordered = [...todos];
        const draggedTodo = reordered.splice(dragItem.current, 1)[0];
        reordered.splice(dragOverItem.current, 0, draggedTodo);

        dragItem.current = null;
        dragOverItem.current = null;
        setDraggingId(null);
        setDragOverId(null);

        onReorder(reordered);
    };

    const handleDragEnd = () => {
        setDraggingId(null);
        setDragOverId(null);
        dragItem.current = null;
        dragOverItem.current = null;
    };

    return (
        <div className="todo-list">
            {todos.map((todo, index) => (
                <div
                    key={todo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index, todo.id)}
                    onDragEnter={(e) => handleDragEnter(e, index, todo.id)}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragEnd={handleDragEnd}
                    className={`drag-wrapper ${draggingId === todo.id ? 'dragging' : ''} ${dragOverId === todo.id && draggingId !== todo.id ? 'drag-over' : ''}`}
                >
                    <TodoItem
                        todo={todo}
                        loadTodos={loadTodos}
                        setDeleteTodo={setDeleteTodo}
                        selectedTodos={selectedTodos}
                        handleSelectTodo={handlSelectTodo}
                    />
                </div>
            ))}
        </div>
    );
}

export default TodoList;