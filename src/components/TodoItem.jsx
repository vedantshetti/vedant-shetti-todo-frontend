import { useState } from "react";
import { TodoService } from "../services/todoService";
import SubtaskPanel from "./SubtaskPanel";
import { Pencil, Trash2, Bookmark, Zap, CheckCircle2, Circle, Clock } from "lucide-react";

const STATUS_STYLES = {
    "completed": { badge: "bg-emerald-100 text-emerald-700", title: "text-emerald-700", dot: "bg-emerald-500", label: "Completed", Icon: CheckCircle2 },
    "in-progress": { badge: "bg-teal-100 text-teal-700", title: "text-teal-700", dot: "bg-teal-500", label: "In Progress", Icon: Circle },
    "on-hold": { badge: "bg-lime-100 text-lime-700", title: "text-lime-700", dot: "bg-lime-500", label: "On Hold", Icon: Clock },
};

function TodoItem({ todo, loadTodos, setDeleteTodo, selectedTodos, handleSelectTodo }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || "");
    const [category, setCategory] = useState(todo.category || "");
    const [showSubtasks, setShowSubtasks] = useState(false);

    const style = STATUS_STYLES[todo.status] || STATUS_STYLES["in-progress"];
    const StatusIcon = style.Icon;

    const handleUpdate = async () => {
        await TodoService.updateTodo(todo.id, { title, description, category: category || null });
        setEditing(false);
        loadTodos();
    };

    const handleStatusChange = async (e) => {
        await TodoService.updateTodo(todo.id, { status: e.target.value });
        loadTodos();
    };

    const handleBookmark = async () => {
        await TodoService.toggleBookmark(todo.id);
        loadTodos();
    };

    const completedSubs = (todo.subtasks || []).filter((s) => s.completed).length;
    const totalSubs = (todo.subtasks || []).length;

    return (
        <>
            <div className="group flex items-start gap-3 bg-white rounded-2xl border border-slate-200 px-4 py-3.5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
                <input
                    type="checkbox"
                    checked={selectedTodos.includes(todo.id)}
                    onChange={() => handleSelectTodo(todo.id)}
                    className="mt-1 w-4 h-4 accent-green-600 cursor-pointer shrink-0"
                />

                <div className="flex-1 min-w-0">
                    {editing ? (
                        <div className="flex flex-wrap gap-2 items-center">
                            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"
                                className="flex-1 min-w-32 px-3 py-1.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-green-500" />
                            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"
                                className="flex-1 min-w-32 px-3 py-1.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-green-500" />
                            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category"
                                className="w-28 px-3 py-1.5 rounded-lg border border-slate-300 text-sm outline-none focus:border-green-500" />
                            <button onClick={handleUpdate} className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">Save</button>
                            <button onClick={() => setEditing(false)} className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors">Cancel</button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-sm font-semibold ${style.title}`}>{todo.title}</span>
                                {todo.category && (
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">{todo.category}</span>
                                )}
                            </div>
                            {todo.description && <p className="text-xs text-slate-500 mt-0.5 truncate">{todo.description}</p>}
                            {totalSubs > 0 && (
                                <div className="flex items-center gap-2 mt-1.5">
                                    <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full transition-all"
                                            style={{ width: `${(completedSubs / totalSubs) * 100}%` }} />
                                    </div>
                                    <span className="text-xs text-slate-400">{completedSubs}/{totalSubs} subtasks</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <div className="relative">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer select-none ${style.badge}`}>
                            <StatusIcon size={12} />
                            {style.label}
                        </span>
                        <select value={todo.status} onChange={handleStatusChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                            <option value="in-progress">In Progress</option>
                            <option value="on-hold">On Hold</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={handleBookmark} title={todo.bookmarked ? "Remove bookmark" : "Bookmark"}
                            className={`p-1.5 rounded-lg transition-colors ${todo.bookmarked ? "bg-lime-100 text-lime-600" : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"}`}>
                            <Bookmark size={14} className={todo.bookmarked ? "fill-lime-500" : ""} />
                        </button>
                        <button onClick={() => setShowSubtasks(true)} title="Subtasks"
                            className="relative p-1.5 rounded-lg text-slate-400 hover:bg-green-100 hover:text-green-600 transition-colors">
                            <Zap size={14} />
                            {totalSubs > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                                    {totalSubs}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setEditing(true)} title="Edit"
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-teal-100 hover:text-teal-600 transition-colors">
                            <Pencil size={14} />
                        </button>
                        <button onClick={() => setDeleteTodo(todo)} title="Delete"
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {showSubtasks && (
                <SubtaskPanel todo={todo} onClose={() => { setShowSubtasks(false); loadTodos(); }} />
            )}
        </>
    );
}

export default TodoItem;