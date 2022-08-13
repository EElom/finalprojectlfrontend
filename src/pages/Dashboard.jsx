import useAuth from "../../src/context/auth/useAuth"
import FormToDo from "../components/Forms/FormToDo"
import ToDoItem from "../components/ToDoItem"
import TodoPage from "./DetailsTodo"
import service from "../services/apiHandler"



import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
    const { isLoggedIn, currentUser, removeUser } = useAuth()
    const [todos,setTodos] = useState([])
    const navigate = useNavigate()

    const getAllTodos = async () => {
        const response = await service.get(`/todos`)
        setTodos(response.data)
    }

    useEffect(() => {
        getAllTodos ()
    }, []);

        
    console.log(todos)
return (

    <div>
        <section className = "heading">
            <h1> Welcome {currentUser.name} </h1>
            <p> Use this space to create your tasks.</p>
        </section>

        <FormToDo />

        <section className ='content'>
            {todos.length > 0 ? (
                <div className='tasks'>
                    {todos.map((todo) => (
                        <ToDoItem 
                            key={todo._id} 
                            _id={todo._id}
                            status={todo.status}
                            name={todo.name}
                            description={todo.description}
                            dueDate ={todo.dueDate}
                        />
                    ))}
                </div>
            ) : (
                <h3> You have not set any task yet </h3>
            )}

        </section>

    </div>
    )
}
export default Dashboard

