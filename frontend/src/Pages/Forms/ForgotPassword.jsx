import { Link } from "react-router-dom";
import "./Form.css"
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { forgotPassword } from "../../Redux/apiCalls/passwordApiCall";
const ForgotPassword = () => {

const dispatch =useDispatch()
const [email,setEmail]=useState("");

const formSubmitHandler=(e)=>{
    e.preventDefault();

    if(email.trim()=="") return toast.error("Email Is Required")

    dispatch(forgotPassword(email))
}

    return ( 
       <section className="form-container">
        <h1 className="form-title">Forgot Password </h1>
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
            <button type="submit" className="form-btn">Submit</button>
        </form>
       </section>
     );
}
 
export default ForgotPassword;