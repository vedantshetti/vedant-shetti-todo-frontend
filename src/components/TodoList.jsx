import { useRef, useState } from "react";
import { ClipboardList } from "lucide-react";
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

    const handleDrop = (e) => {
        e.preventDefault();
        if (dragItem.current === null || dragOverItem.current === null || dragItem.current === dragOverItem.current) {
            setDraggingId(null); setDragOverId(null); return;
        }
        const reordered = [...todos];
        const dragged = reordered.splice(dragItem.current, 1)[0];
        reordered.splice(dragOverItem.current, 0, dragged);
        dragItem.current = null; dragOverItem.current = null;
        setDraggingId(null); setDragOverId(null);
        onReorder(reordered);
    };

    const handleDragEnd = () => { setDraggingId(null); setDragOverId(null); dragItem.current = null; dragOverItem.current = null; };

    if (todos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <ClipboardList size={48} strokeWidth={1.2} className="mb-4 opacity-40" />
                <p className="text-base font-semibold text-slate-500">No tasks found</p>
                <p className="text-sm mt-1">Add one above or adjust your filters</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 mb-2">
            {todos.map((todo, index) => (
                <div
                    key={todo.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index, todo.id)}
                    onDragEnter={(e) => handleDragEnter(e, index, todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onDragEnd={handleDragEnd}
                    className={`rounded-2xl transition-all
                        ${draggingId === todo.id ? "opacity-40 scale-[0.99]" : ""}
                        ${dragOverId === todo.id && draggingId !== todo.id ? "ring-2 ring-green-400 ring-dashed bg-green-50/50 rounded-2xl" : ""}`}
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