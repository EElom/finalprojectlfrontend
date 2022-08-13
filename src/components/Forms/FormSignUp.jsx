import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import service from "../../services/apiHandler"
import { FaUser } from 'react-icons/fa'

const FormSignUp = () => {
	const [user, setUser] = useState({ name: "", email: "", password: "" })
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await service.signup(user)
			console.log(res)
			navigate("/signin")
		} catch (error) {
			setError(e.message)
		}
	}
	return (
		<>
			{error && <h3 className="error">{error.message}</h3>}

				<section className="heading">
					<h1>
						<FaUser /> Signup
					</h1>
					<p> Please create an account </p>
				</section>

				<section className="form">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<input
								onChange={(e) =>
									setUser({ ...user, [e.target.name]: e.target.value })
								}
								value={user.name}
								type="text"
								className="form-control"
								id="name"
								name="name"
								placeholder='Enter your name'
							/>
					</div>

				<div className="form-group">
						<input
							onChange={(e) =>
								setUser({ ...user, [e.target.name]: e.target.value })
							}
							value={user.email}
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder='Enter your email'
						/>
				</div>

				<div className="form-group">
					<input
						onChange={(e) =>
							setUser({ ...user, [e.target.name]: e.target.value })
						}
						value={user.password}
						type="password"
						id="password"
						name="password"
						placeholder='Enter password'
					/>
				</div>
					<div className="form-group">
						<button type='submit' className='btn btn-block'>
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default FormSignUp
