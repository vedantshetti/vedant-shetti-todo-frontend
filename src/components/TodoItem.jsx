import { useState } from "react";
import { TodoService } from "../services/todoService";

function TodoItem({todo,loadTodos,setDeleteTodo}){
    const[editing,setEditing] = useState(false);
    const[title,setTitle]=useState(todo.title);
    const[description,setDescription]=useState(todo.description);

    const handleUpdate= async()=>{
        await TodoService.updateTodo(todo.id,{
            title,description
        })

        setEditing(false);
        loadTodos();

    };

    const handleStatusChange=async(e)=>{

        await TodoService.updateTodo(todo.id,{status:e.target.value});
        loadTodos();

    };

    const handleDelete=async()=>{

        await TodoService.deleteTodo(todo.id);
        loadTodos();

    };

    return(
        <div className="todo-item" data-status={todo.status}>


            <div className="todo-left">
                <input type="checkbox"/>
            
            {editing ? (
                <div style={{width:"100%"}}>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    <button onClick={handleUpdate}>Save</button>
                </div>
            ):(
             
            <div>
                <div className="todo-title">{todo.title}</div>
                <small style={{color:"#64748b"}}>{todo.description}</small>
                

             </div>   
        

            )}
            </div>








            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <select>
                    <option value="completed">completed</option>
                    <option value="on-hold">on-hold</option>
                    <option value="in-progress">in-progress</option>
                </select>
              
              <div className="todo-actions">
                <button className="icon-btn" onClick={()=>setEditing(true)}>Edit</button>
                <button className="icon-btn delete-btn"  onClick={()=>{console.log(todo) ; setDeleteTodo(todo)  } }>Delete</button>
              </div>
            

    
        </div>    
        </div>
    );

}

export default TodoItem;