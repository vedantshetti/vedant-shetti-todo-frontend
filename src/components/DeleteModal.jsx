import { TodoService } from "../services/todoService";
import { Trash2, AlertTriangle } from "lucide-react";

function DeleteModal({ todo, onClose, loadTodos }) {
    const handleConfirmDelete = async () => {
        await TodoService.deleteTodo(todo.id);
        loadTodos();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
                style={{ animation: "modalPop 0.2s ease" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                    <Trash2 size={24} className="text-emerald-500" />
                </div>
                <h2 className="text-lg font-bold text-slate-800 text-center mb-2">Delete Task</h2>
                <p className="text-sm text-slate-500 text-center mb-6 leading-relaxed">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-slate-700">"{todo.title}"</span>?
                    <br />This action cannot be undone.
                </p>

                <div className="flex items-center gap-2 bg-lime-50 border border-lime-200 rounded-xl px-3 py-2.5 mb-6 text-xs text-lime-700">
                    <AlertTriangle size={13} className="shrink-0 text-lime-500" />
                    All subtasks will also be deleted.
                </div>

                <div className="flex gap-3">
                    <button onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleConfirmDelete}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors">
                        <Trash2 size={14} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;