import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Instance from "./AxiosConfig";
import { useNavigate } from 'react-router-dom';

// import '../src/SignUp.css';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });

    function handleOnChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await Instance.post("/auth/register", formData);
            if (response.status === 200) {
                console.log("Registration Successful");
                navigate("/");
            }
        } catch (error) {
            console.error("Registration Failed", error);
        }
    }

    return (
        <div className='loginbody'>
            <div className="login-container">
                <h2>Bill Splitter</h2>
                <p>Split your bills easily</p>
                <form onSubmit={handleSubmit}> 
                    <input
                        className="SignUpInput  " 
                        type="text"
                        name="fname"
                        id="first_name"
                        value={formData.fname}
                        placeholder="First Name"
                        onChange={handleOnChange}
                        required
                    />

                    <input
                        className="SignUpInput  "
                        type="text"
                        name="lname"
                        id="last_name"
                        value={formData.lname}
                        placeholder="Last Name"
                        onChange={handleOnChange}
                        required
                    />

                    <input
                        className="SignUpInput  "
                        type="email"
                        name="email"
                        id="email_id"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleOnChange}
                        required
                    />

                    <input
                        className="SignUpInput  "
                        type="password"
                        name="password"
                        id="user_password"
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleOnChange}
                        required
                    />

                    <button className='loginbtn' type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/">Login In</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
