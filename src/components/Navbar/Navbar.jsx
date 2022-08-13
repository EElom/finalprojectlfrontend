import { NavLink } from "react-router-dom"
import useAuth from "../../context/auth/useAuth"
import "./Navbar.css"
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'


const Navbar = () => {
	// We are getting the user and some functions from the context
	const { isLoggedIn, currentUser, removeUser } = useAuth()
	// console.log(currentUser)
	return (
		<nav className="navbar">
			<div className="logo">  
				<NavLink className="logo" to="/"> Organizer </NavLink>
			</div>

			{isLoggedIn && (
				<>
					
						<NavLink to="/profile">{currentUser.name}</NavLink>
						<NavLink to="/dashboard"> My dashboard </NavLink>
						<button onClick={removeUser}> <FaSignOutAlt /> Log-Out</button>
						
					
				</>
			)}
			{!isLoggedIn && (
				<div className="navlink">

						<NavLink to="/signin"> <FaSignInAlt/> Log in</NavLink>			
						<NavLink to="/signup"><FaUser/> Sign Up</NavLink>
					
					
				</div>
			)}
			 
		</nav>
	)
}





export default Navbar



