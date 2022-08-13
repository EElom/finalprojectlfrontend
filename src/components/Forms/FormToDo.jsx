import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../../services/apiHandler";






const FormToDo = () => {
    const [name, setName] = useState ("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [dueDate, setDueDate] = useState("")
    const statusOptions = ["To do", "Doing", "Done"]
    const navigate = useNavigate()



const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("authToken")
    const payload = { name, description, status, dueDate}
    console.log(payload);
    try {
        const response = await service.post (`/todos`, payload, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        navigate ("/dashboard")

    } catch (error) {
        console.log(error)
    }
}


return (
    <section className="form">
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Task name </label>
                <input 
                    type="text"
                    id ="name"
                    name="name"
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description </label>
                <textarea 
                    type="text"
                    id ="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
                

            <div className="form-group">
                <label htmlFor="status">Status </label>
                <select 
                    type="text"
                    id ="status"
                    name="status"
                    value={-1}  
                                
                    onChange={(e) => setStatus(e.target.value)}>
                    <option disabled value={-1}>Pick The status</option>
                        {statusOptions.map((option) => (
                            <option
                                key = {option}  
                                value = {option}>
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
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <div>
                <button className ='btn btn-block' type='submit'> New task </button>
            </div>

        </form>
    </section>
)

}

export default FormToDo