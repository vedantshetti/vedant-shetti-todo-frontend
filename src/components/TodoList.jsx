import TodoItem from "./TodoItem";

function TodoList({todos , loadTodos,setDeleteTodo}){

    return (
        <div className="todo-list">
            {todos.map(todo=>(
                <TodoItem key ={todo.id} todo={todo} loadTodos={loadTodos} setDeleteTodo={setDeleteTodo}/>
            ))}
        </div>
    );

}

export default TodoList;