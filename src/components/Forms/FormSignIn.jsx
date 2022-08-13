import React, { useState } from "react"
import service from "../../services/apiHandler"
import useAuth from "../../context/auth/useAuth"
import { useNavigate } from "react-router-dom"
import { FaSignInAlt } from 'react-icons/fa'

const FormSignIn = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	})
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const { storeToken, authenticateUser } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await service.signin(user)
			console.log(res)
			storeToken(res.authToken)
			await authenticateUser()
			navigate("/dashboard")
		} catch (error) {
			console.log(error)
			setError(error)
		}
	}

	return (
		<>
			{error && <h3 className="error">{error.message}</h3>}
			
			
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Signin
				</h1>
				<p> Login and start organizing your projects</p>
			</section>
			
			<section className='form'>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="email"
						className ="form-control"
						id="email"
						name="email"
						placeholder="Enter your Email"
						onChange={(e) =>
							setUser({ ...user, [e.target.name]: e.target.value })
						}
						value={user.email}
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						placeholder='Enter password'
						onChange={(e) =>
							setUser({ ...user, [e.target.name]: e.target.value })
						}
						value={user.password}
					/>
				</div>
				<div className = "form-group">
					<button tyoe ='submit' className = 'btn btn-block'>Submit</button>
				</div>
			</form>
			</section>
		</>
	)
}

export default FormSignIn
