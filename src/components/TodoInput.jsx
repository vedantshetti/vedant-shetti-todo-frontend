import { useState } from "react";
import { TodoService } from "../services/todoService";

function TodoInput({loadTodos}){
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAdd = async()=>{
        if(!title.trim()) return;

        await TodoService.addTodo(title,description);

        // await TodoService.addTodo(title,description);
        setTitle("");
        setDescription("");
        loadTodos();

    };
    return(
        <div className="todo-input">
            <input value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="title"/>
            <input value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="description"/>
            <button onClick={handleAdd}>Add</button>
            
        </div>
    );
}

export default TodoInput;