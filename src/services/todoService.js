const API_URL = "http://localhost:5000";

export const TodoService = {
    getTodos: async () => {
        const response = await fetch(`${API_URL}/todos`);
        return response.json();
    },
    addTodo: async (title,description) => {
        const res = await fetch(`${API_URL}/todos`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title,description})

        });
        return res.json();
    },
    updateTodo: async (id,data) => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    deleteTodo: async (id) => {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE",
        });
        return response.json();
    },

};