import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import { TodoService } from './services/todoService';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import DeleteModal from './components/DeleteModal';
import ActionBar from './components/ActionBar';
import Pagination from './components/Pagination';



function App() {

  const [todos, setTodos] = useState([]);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const loadTodos = async () => {
    const data = await TodoService.getTodos();
    setTodos(data);
  }

  useEffect(() => {
    loadTodos();
  }, []);


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTodos(paginatedTodos.map(t => t.id));
    } else {
      setSelectedTodos([]);
    }
  };

  const handleSelectTodo = (id) => {
    setSelectedTodos((prev) => {
      return prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    })

  }

  const handleBulkStatusChange = async (status) => {
    if (!status) return;
    await Promise.all(selectedTodos.map((id) => TodoService.updateTodo(id, { status })))
    setSelectedTodos([]);
    loadTodos();
  }

  const handleBulkDelete = async () => {
    if (!selectedTodos.length) return;
    await TodoService.bulkDelete(selectedTodos);
    setSelectedTodos([]);
    setCurrentPage(1);
    loadTodos();
  };

  const handleReorder = async (reorderedTodos) => {
    // Optimistically update local state
    const newTodos = [...todos];
    // Replace the paginated slice with the reordered version
    const startIndex = (currentPage - 1) * itemsPerPage;
    reorderedTodos.forEach((todo, i) => {
      const globalIdx = newTodos.findIndex(t => t.id === todo.id);
      if (globalIdx !== -1) newTodos[globalIdx] = todo;
    });
    setTodos(newTodos);
    // Persist the full order to backend using all todo IDs in current order
    const orderedIds = newTodos.map(t => t.id);
    await TodoService.reorderTodos(orderedIds);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'completed') return todo.status === 'completed';
    if (filterStatus === 'in-progress') return todo.status === 'in-progress';
    if (filterStatus === 'on-hold') return todo.status === 'on-hold';
    return false;
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedTodos([]);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
    setSelectedTodos([]);
  };

  return (
    <div className="app">
      <h1>TODOER</h1>
      <h3>What do you want to do today?</h3>

      <TodoInput loadTodos={loadTodos} />

      <ActionBar
        todos={paginatedTodos}
        selectedTodos={selectedTodos}
        handleSelectAll={handleSelectAll}
        handleBulkStatusChange={handleBulkStatusChange}
        handleBulkDelete={handleBulkDelete}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />


      <TodoList
        todos={paginatedTodos}
        loadTodos={loadTodos}
        setDeleteTodo={setDeleteTodo}
        selectedTodos={selectedTodos}
        handlSelectTodo={handleSelectTodo}
        onReorder={handleReorder}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {deleteTodo && (< DeleteModal todo={deleteTodo} onClose={() => setDeleteTodo(null)} loadTodos={loadTodos} />)}


    </div>
  )

}

export default App
