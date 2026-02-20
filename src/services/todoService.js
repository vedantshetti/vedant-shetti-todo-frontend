const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};


export const AuthService = {
    register: async (name, email, password) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        return res.json();
    },
    login: async (email, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return res.json();
    },
    getMe: async () => {
        const res = await fetch(`${API_URL}/auth/me`, { headers: getAuthHeaders() });
        return res.json();
    },
};


export const TodoService = {
    getTodos: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_URL}/todos?${query}`, { headers: getAuthHeaders() });
        return res.json();
    },
    getCategories: async () => {
        const res = await fetch(`${API_URL}/todos/categories`, { headers: getAuthHeaders() });
        return res.json();
    },
    addTodo: async (title, description, category) => {
        const res = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ title, description, category }),
        });
        return res.json();
    },
    updateTodo: async (id, data) => {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    },
    toggleBookmark: async (id) => {
        const res = await fetch(`${API_URL}/todos/${id}/bookmark`, {
            method: "PUT",
            headers: getAuthHeaders(),
        });
        return res.json();
    },
    deleteTodo: async (id) => {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        return res.json();
    },
    bulkDelete: async (ids) => {
        const res = await fetch(`${API_URL}/todos/bulk`, {
            method: "DELETE",
            headers: getAuthHeaders(),
            body: JSON.stringify({ ids }),
        });
        return res.json();
    },
    reorderTodos: async (orderedIds) => {
        const res = await fetch(`${API_URL}/todos/reorder`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ orderedIds }),
        });
        return res.json();
    },


    getSubtasks: async (todoId) => {
        const res = await fetch(`${API_URL}/todos/${todoId}/subtasks`, { headers: getAuthHeaders() });
        return res.json();
    },
    addSubtask: async (todoId, title) => {
        const res = await fetch(`${API_URL}/todos/${todoId}/subtasks`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ title }),
        });
        return res.json();
    },
    updateSubtask: async (todoId, subtaskId, data) => {
        const res = await fetch(`${API_URL}/todos/${todoId}/subtasks/${subtaskId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return res.json();
    },
    deleteSubtask: async (todoId, subtaskId) => {
        const res = await fetch(`${API_URL}/todos/${todoId}/subtasks/${subtaskId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        return res.json();
    },
};