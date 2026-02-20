import { useState } from "react";
import { TodoService } from "../services/todoService";
import { X, CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";

function SubtaskPanel({ todo, onClose }) {
    const [subtasks, setSubtasks] = useState(todo.subtasks || []);
    const [newTitle, setNewTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const reload = async () => {
        const data = await TodoService.getSubtasks(todo.id);
        setSubtasks(Array.isArray(data) ? data : []);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        setLoading(true);
        await TodoService.addSubtask(todo.id, newTitle.trim());
        setNewTitle("");
        await reload();
        setLoading(false);
    };

    const handleToggle = async (sub) => {
        await TodoService.updateSubtask(todo.id, sub.id, { completed: !sub.completed });
        await reload();
    };

    const handleDelete = async (subId) => {
        await TodoService.deleteSubtask(todo.id, subId);
        await reload();
    };

    const completed = subtasks.filter((s) => s.completed).length;
    const total = subtasks.length;
    const pct = total > 0 ? (completed / total) * 100 : 0;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end" onClick={onClose}>
            <div
                className="w-full max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto"
                style={{ animation: "slideInRight 0.25s ease" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between p-6 border-b border-slate-100">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Subtasks</h3>
                        <p className="text-xs text-slate-400 mt-1 truncate max-w-[220px]">↳ {todo.title}</p>
                    </div>
                    <button onClick={onClose}
                        className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-100 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {total > 0 && (
                    <div className="px-6 pt-5">
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span className="font-semibold text-slate-700">{completed}/{total} completed</span>
                            <span className="font-medium">{Math.round(pct)}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                )}

                <ul className="flex-1 px-6 py-5 flex flex-col gap-2">
                    {subtasks.length === 0 && (
                        <li className="flex flex-col items-center justify-center text-slate-400 text-sm py-12 gap-2">
                            <CheckCircle2 size={32} className="opacity-25" />
                            <span>No subtasks yet. Add one below.</span>
                        </li>
                    )}
                    {subtasks.map((sub) => (
                        <li key={sub.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all
                                ${sub.completed ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-200"}`}>
                            <input
                                type="checkbox"
                                checked={sub.completed}
                                onChange={() => handleToggle(sub)}
                                id={`sub-${sub.id}`}
                                className="w-4 h-4 accent-emerald-500 cursor-pointer shrink-0"
                            />
                            <label htmlFor={`sub-${sub.id}`}
                                className={`flex-1 text-sm cursor-pointer transition-colors ${sub.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                                {sub.title}
                            </label>
                            <button onClick={() => handleDelete(sub.id)} title="Remove"
                                className="p-1 rounded-lg text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 transition-colors shrink-0">
                                <Trash2 size={13} />
                            </button>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleAdd} className="p-6 border-t border-slate-100 flex gap-2">
                    <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Add a subtask…"
                        className="flex-1 px-3 py-2.5 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-slate-800 placeholder-slate-400"
                    />
                    <button type="submit" disabled={loading}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60">
                        {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SubtaskPanel;
