import { useState, useEffect, useCallback, useRef } from "react";
import { TodoService } from "./services/todoService";
import { useAuth } from "./context/useAuth";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Search, X, Bookmark } from "lucide-react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DeleteModal from "./components/DeleteModal";
import ActionBar from "./components/ActionBar";
import Pagination from "./components/Pagination";

function MainApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [categories, setCategories] = useState([]);

  const [deleteTodo, setDeleteTodo] = useState(null);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const debounceRef = useRef(null);

  const buildParams = useCallback(() => {
    const params = { page: currentPage, limit: itemsPerPage, status: filterStatus, search };
    if (filterCategory) params.category = filterCategory;
    if (bookmarkedOnly) params.bookmarked = true;
    return params;
  }, [currentPage, itemsPerPage, filterStatus, search, filterCategory, bookmarkedOnly]);

  const loadTodos = useCallback(async () => {
    const data = await TodoService.getTodos(buildParams());
    if (data?.todos) { setTodos(data.todos); setPagination(data.pagination); }
  }, [buildParams]);

  const loadCategories = useCallback(async () => {
    const data = await TodoService.getCategories();
    if (Array.isArray(data)) setCategories(data);
  }, []);

  useEffect(() => { loadTodos(); }, [loadTodos]);
  useEffect(() => { loadCategories(); }, [loadCategories]);

  const handleSearchChange = (val) => {
    setSearchInput(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { setSearch(val); setCurrentPage(1); }, 400);
  };

  const handleSelectAll = (e) => setSelectedTodos(e.target.checked ? todos.map((t) => t.id) : []);
  const handleSelectTodo = (id) => setSelectedTodos((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleBulkStatusChange = async (status) => {
    if (!status) return;
    await Promise.all(selectedTodos.map((id) => TodoService.updateTodo(id, { status })));
    setSelectedTodos([]);
    loadTodos();
  };

  const handleBulkDelete = async () => {
    if (!selectedTodos.length) return;
    await TodoService.bulkDelete(selectedTodos);
    setSelectedTodos([]);
    setCurrentPage(1);
    loadTodos();
  };

  const handleReorder = async (reordered) => {
    setTodos(reordered);
    await TodoService.reorderTodos(reordered.map((t) => t.id));
  };

  const handleFilterStatus = (s) => { setFilterStatus(s); setCurrentPage(1); setSelectedTodos([]); };
  const handlePageChange = (p) => { setCurrentPage(p); setSelectedTodos([]); };
  const handleItemsPerPage = (v) => { setItemsPerPage(Number(v)); setCurrentPage(1); setSelectedTodos([]); };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-green-50/30">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <span className="text-xl font-black bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent tracking-widest">TODOER</span>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 font-medium">
              <User size={14} className="text-slate-400" />
              <span className="text-slate-700 font-semibold">{user?.name}</span>
            </div>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-1">Your Task Board</h1>
          <p className="text-slate-500">Stay organized, stay productive.</p>
        </div>

        <TodoInput loadTodos={() => { loadTodos(); loadCategories(); }} categories={categories} />

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search tasks…"
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none focus:border-green-500 focus:ring-3 focus:ring-green-100 transition-all text-slate-800 placeholder-slate-400 shadow-sm"
            />
            {searchInput && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none text-slate-700 shadow-sm cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <button
            onClick={() => { setBookmarkedOnly(!bookmarkedOnly); setCurrentPage(1); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all shadow-sm
                            ${bookmarkedOnly ? "bg-lime-100 border-lime-300 text-lime-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <Bookmark size={14} className={bookmarkedOnly ? "fill-lime-500 text-lime-500" : ""} />
            Bookmarks
          </button>
        </div>

        <ActionBar
          todos={todos}
          selectedTodos={selectedTodos}
          handleSelectAll={handleSelectAll}
          handleBulkStatusChange={handleBulkStatusChange}
          handleBulkDelete={handleBulkDelete}
          filterStatus={filterStatus}
          setFilterStatus={handleFilterStatus}
        />

        <TodoList
          todos={todos}
          loadTodos={loadTodos}
          setDeleteTodo={setDeleteTodo}
          selectedTodos={selectedTodos}
          handlSelectTodo={handleSelectTodo}
          onReorder={handleReorder}
        />

        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          itemsPerPage={itemsPerPage}
          total={pagination.total}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPage}
        />
      </main>

      {deleteTodo && (
        <DeleteModal todo={deleteTodo} onClose={() => setDeleteTodo(null)} loadTodos={loadTodos} />
      )}
    </div>
  );
}

export default MainApp;
