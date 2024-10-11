import "./Form.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useDispatch,useSelector} from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { getResetPassword, resetPassword } from "../../Redux/apiCalls/passwordApiCall";

const ResetPassword = () => {

const dispatch =useDispatch();
const {isError}=useSelector(state=>state.password);
const {userId,token}=useParams();
const navigate=useNavigate()

const [password,setPassword]=useState("");

useEffect(()=>{
    dispatch(getResetPassword(userId,token));
},[userId,token])

const formSubmitHandler=(e)=>{
    e.preventDefault();

    if(password.trim()==="") return toast.error("Password Is Required")
        
        dispatch(resetPassword(password,{userId,token}));
        setPassword("")
        navigate("/login")

}

    return ( 
       <section className="form-container">
        <h1 className="form-title">Reset Password</h1>
        {isError?
         <h1>Not Found</h1>
         :
         <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
                <label htmlFor="password" className="form-label">
                   New Password
                </label>
                <input type="password"
                id="password"
                placeholder="Enter You`r New Password"
                className="form-input"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}} 
                 />
            </div>
            <button type="submit" className="form-btn">Submit</button>
        </form>
        }
       </section>
     );
}
 
export default ResetPassword;