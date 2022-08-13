import useAuth from "../context/auth/useAuth"
import FormToDo from "../components/Forms/FormToDo"
import ToDoItem from "../components/ToDoItem"

import service from "../services/apiHandler"



import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'



const DetailsTodo = () => {
    const { isLoggedIn, currentUser, removeUser } = useAuth()
    const [detailTodo, setDetailTodo] = useState({})
    const [editMode, setEditMode] = useState (false)
    const [editTodo, setEditTodo] = useState ({})
    const [feedback, setFeedback] = useState ('')
    const { _id } = useParams()

    const navigate = useNavigate()

    const statusOptions = ["To do", "Doing", "Done"]


    const handleDelete = async () => {
        const { data } = await service.delete(`/todos/${_id}`)
        setFeedback (data.message)
        setTimeout(() => navigate('/todo'),1000)

    }

    

    const handleEditTodo = async (e) => {
        e.preventDefault()
        console.log (editTodo)
        const { data } = await service.put(`/todos/${_id}`, editTodo)
        console.log(data)
        data.dueDate = data.dueDate.slice(0, 10)
        setDetailTodo(data)
        setEditMode(false)

    }


    const getOneTodo = async () => {
        const { data } = await service.get(`/todos/${_id}`)
        data.dueDate = data.dueDate.slice(0, 10)
        setEditTodo(data)
        setDetailTodo(data)
    }

    useEffect(() => {

        getOneTodo ()

    }, [])

    if (Object.keys(detailTodo).length === 0) return <div> Loading</div>

        

return (
    <> 
    <section className ='heading'>
            <h1>Here are your task details </h1>
            <p> Edit or delete your task here </p>
    </section>
    <div className ='task'>
        <ToDoItem
            key={detailTodo._id} 
            _id={detailTodo._id}
            status={detailTodo.status}
            name={detailTodo.name}
            description={detailTodo.description}
            dueDate ={detailTodo.dueDate}  
        />
        <button className="close" onClick={handleDelete}> 
                X
        </button>
    </div>

    <div>
        <button className ='btn btn-block' type='submit'onClick={() => setEditMode(!editMode)}> Edit task </button>
    </div>

    {/* This form is conditionally rendered */}
    {editMode && (
        <section className="form"> 
            <form onSubmit = {handleEditTodo}>
                <div className="form-group">
                    <label htmlFor="name">Task name </label>
                    <input 
                        type="text"
                        id ="name"
                        name="name"
                        value = {editTodo.name}
                        onChange={(e) => setEditTodo({...editTodo,[e.target.name]: e.target.value,
                        })
                    }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description </label>
                    <textarea 
                        type="text"
                        id ="description"
                        name="description"
                        value={editTodo.description}
                        onChange={(e) => setEditTodo({...editTodo,[e.target.name]: e.target.value,
                        })
                    }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status </label>
                    <select 
                        type="text"
                        id ="status"
                        name="status"
                        value={editTodo.status}
                        onChange={(e) => setEditTodo({...editTodo,[e.target.name]: e.target.value,
                        })
                    }>
                            {statusOptions.map((option) => (
                                <option key = {option}value={option}>
                                    {option}
                                </option>
                            )
                            )}
                    </select>
                </div>

            
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date </label>
                    <input
                        type="date"
                        id ="dueDate"
                        name="dueDate"
                        value ={editTodo.dueDate}
                        onChange={(e) => setEditTodo({...editTodo,[e.target.name]: e.target.value,
                        })
                    }
                    />
            </div>

            <button className ='btn btn-block' type = 'submit' >  Save </button>

            </form>
            
        </section>
    )}



    </>

)
}

export default DetailsTodo;