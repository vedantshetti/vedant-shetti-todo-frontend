import { TodoService } from "../services/todoService";

function DeleteModal({todo,onClose,loadTodos}){

    const handleConfirmDelete= async()=>{
        await TodoService.deleteTodo(todo.id);
        loadTodos();
        onClose();
    };
        return(
            <div className="modal-overlay">


                <div className="modal">


                    <h2>Delete Todo</h2>


                    <p>your are deleting <b>"{todo.title}"</b>
                    <br/>
                    these can not be reversed</p>


                    <div className="modal-actions">
                        <button className="danger-btn" onClick={handleConfirmDelete}>Delete</button>
                        <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        )

    
    
}

export default DeleteModal;