import { Link,useNavigate } from "react-router-dom";
import "./Form.css"
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch,useSelector} from "react-redux"
import { registerUser } from "../../Redux/apiCalls/authApiCall";
import swal from "sweetalert"
const Register = () => {
const {registerMessage}=useSelector(state=>state.auth);

const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const dispatch=useDispatch();


const formSubmitHandler=(e)=>{
    e.preventDefault();

    if(username.trim()==="") return toast.error("User Name Is Required")
    if(email.trim()==="") return toast.error("Email Is Required")
    if(password.trim()==="") return toast.error("Password Is Required")


        dispatch(registerUser({username,email,password}));
}
const navigate=useNavigate();
if(registerMessage){
    swal({
        title:registerMessage,
        icon:"success"
    }).then(isOk=>{
        if(isOk){
            navigate("/login")
        }
    })
}

    return ( 
       <section className="form-container">
        <h1 className="form-title">Create New Account</h1>
        <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input type="text"
                id="username"
                placeholder="Enter You`r username"
                className="form-input" 
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                 />
            </div>
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
            <button type="submit" className="form-btn">Register</button>
        </form>
        <div className="form-footer">
            Already Have An Account <Link to="/login"> Login</Link>
        </div>
       </section>
     );
}
 
export default Register;