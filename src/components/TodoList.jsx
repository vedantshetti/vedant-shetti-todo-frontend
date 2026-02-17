import TodoItem from "./TodoItem";

function TodoList({todos , loadTodos,setDeleteTodo,selectedTodos,handlSelectTodo}){

    return (
        <div className="todo-list">
            {todos.map(todo=>(
                <TodoItem key ={todo.id} todo={todo} loadTodos={loadTodos} setDeleteTodo={setDeleteTodo} selectedTodos={selectedTodos} handlSelectTodo={handlSelectTodo}/>
            ))}
        </div>
    );

}

export default TodoList;