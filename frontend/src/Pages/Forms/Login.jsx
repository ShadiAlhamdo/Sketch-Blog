import { Link } from "react-router-dom";
import "./Form.css"
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { loginUser } from "../../Redux/apiCalls/authApiCall";
const Login = () => {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const dispatch=useDispatch();

const formSubmitHandler=(e)=>{
    e.preventDefault();

    if(email.trim()=="") return toast.error("Email Is Required")
    if(password.trim()=="") return toast.error("Password Is Required")


        dispatch(loginUser({email,password}));
}

    return ( 
       <section className="form-container">
        <h1 className="form-title">Login You`r Account</h1>
        <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input type="email"
                id="email"
                placeholder="Enter You`r Email"
                className="form-input" 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                 />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input type="password"
                id="password"
                placeholder="Enter You`r Password"
                className="form-input"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}} 
                 />
            </div>
            <button type="submit" className="form-btn">Login</button>
        </form>
        <div className="form-footer">
           Did You Forgot You`r Password <Link to="/forgot-password"> Forgot Password</Link>
        </div>
       </section>
     );
}
 
export default Login;