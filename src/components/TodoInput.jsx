import { useState } from "react";
import { TodoService } from "../services/todoService";
import { Plus } from "lucide-react";

function TodoInput({ loadTodos, categories = [] }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [showExtra, setShowExtra] = useState(false);

    const handleAdd = async () => {
        if (!title.trim()) return;
        const cat = customCategory.trim() || category || null;
        await TodoService.addTodo(title.trim(), description.trim() || undefined, cat);
        setTitle(""); setDescription(""); setCategory(""); setCustomCategory(""); setShowExtra(false);
        loadTodos();
    };

    const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) handleAdd(); };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-5">
            <div className="flex gap-3">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What do you want to do?"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none transition-all focus:border-green-500 focus:ring-4 focus:ring-green-100 text-slate-800 placeholder-slate-400"
                />
                <button
                    onClick={() => setShowExtra(!showExtra)}
                    className="px-3 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all text-xs font-bold tracking-widest"
                    title="More options"
                >
                    {showExtra ? "▲" : "▼"}
                </button>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-green-600 to-teal-600 text-white font-semibold text-sm shadow-md shadow-green-200 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    Add
                </button>
            </div>

            {showExtra && (
                <div className="mt-3 flex flex-col gap-3">
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-green-400 transition-all text-slate-800 placeholder-slate-400"
                    />
                    <div className="flex gap-3">
                        <select
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setCustomCategory(""); }}
                            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-green-400 transition-all text-slate-700 bg-white"
                        >
                            <option value="">— Pick category —</option>
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input
                            value={customCategory}
                            onChange={(e) => { setCustomCategory(e.target.value); setCategory(""); }}
                            placeholder="Or type new category"
                            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-green-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoInput;