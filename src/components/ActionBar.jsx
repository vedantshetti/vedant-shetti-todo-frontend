import { CheckCircle2, Circle, Clock, Trash2, ChevronDown } from "lucide-react";

function ActionBar({ todos = [], selectedTodos = [], handleSelectAll, handleBulkStatusChange, handleBulkDelete, filterStatus, setFilterStatus }) {
    const filters = [
        { key: "all", label: "All" },
        { key: "in-progress", label: "In Progress" },
        { key: "on-hold", label: "On Hold" },
        { key: "completed", label: "Completed" },
    ];

    const hasSelection = selectedTodos.length > 0;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3 mb-4 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-slate-600 font-medium cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={todos.length > 0 && selectedTodos.length === todos.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-green-600 rounded cursor-pointer"
                />
                {selectedTodos.length > 0 ? `${selectedTodos.length} selected` : "Select All"}
            </label>

            <div className="relative">
                <select
                    onChange={(e) => { handleBulkStatusChange(e.target.value); e.target.value = ""; }}
                    disabled={!hasSelection}
                    value=""
                    className={`appearance-none pl-3 pr-8 py-2 rounded-xl border text-sm font-medium transition-all outline-none cursor-pointer
                        ${hasSelection ? "border-green-400 bg-green-600 text-white" : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                >
                    <option value="">Mark as…</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="on-hold">On Hold</option>
                </select>
                <ChevronDown size={12} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${hasSelection ? "text-white" : "text-slate-400"}`} />
            </div>

            <button
                onClick={handleBulkDelete}
                disabled={!hasSelection}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all
                    ${hasSelection ? "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"}`}
            >
                <Trash2 size={13} />
                Delete {hasSelection && `(${selectedTodos.length})`}
            </button>

            <div className="flex items-center gap-1 ml-auto flex-wrap">
                {filters.map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setFilterStatus(f.key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                            ${filterStatus === f.key
                                ? "bg-green-600 text-white shadow-sm"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ActionBar;
