import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Instance from './AxiosConfig'
import { useAuth } from './Context/AuthProvider'

function Login() {
const {checkAuth}=useAuth();
let {setIsAuthenticated} = useAuth();
const navigate = useNavigate();
const [formData, setFormData] = useState({
email: "",
password: "",
})

function handleOnChange(e) {
return setFormData({ ...formData, [e.target.name]: e.target.value });
}

async function handleSubmit(e) {
e.preventDefault();
try {
const response = await Instance.post("/auth/login", formData,{withCredentials:true});
console.log(response);
checkAuth();
if (response.status === 200 && response.data.message==="User login successfully") {
setIsAuthenticated(true)
navigate("/Bill");
}
} catch (error) {
console.error(error);
}
}

return (
  <div className='loginbody'><div className="login-container">
      <h2 className='loginh2'>Bill Splitter</h2>
      <p>Split your bills easily</p>
      <form action="#" onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="email"
            name='email'
            id='email'
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            required />
        </div>
        <div className="input-group">
          <input
            type="password"
            name='password'
            id='password'
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            required />
        </div>
        <button className='loginbtn' type="submit">Login</button>
        <p><a href="#">Forgot Password?</a></p>
      </form>
      <p>Don't have an account? <Link to="/signUp">Sign Up</Link></p>
    </div>
    </div>

)
}
export default Login