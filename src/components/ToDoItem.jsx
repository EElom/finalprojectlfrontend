import { useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../services/apiHandler";




const ToDoItem = ({_id, status, name, description, dueDate}) => {
console.log(status)
    return (
        <div className="task">
            
                <Link to={`/todos/${_id}`}>
                    <h2>{status} </h2>
                    <h3> Due date : {dueDate.slice(0,10)}</h3> 
                    <h3>{name}</h3>
                    <p>{description}</p>
                </Link>
            
        </div>

    )
}

export default ToDoItem