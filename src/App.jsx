import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Oops from "./pages/Oops"
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute"
import Dashboard from "./pages/Dashboard"
import TodoPage from "./pages/DetailsTodo"

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route element={<PrivateRoute />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/todos/:_id" element={<TodoPage />} />

				</Route>
				<Route path="*" element={<Oops />} />
			</Routes>
		</div>
	)
}

export default App
