import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "../../Redux/apiCalls/authApiCall";
import { toast } from "react-toastify";

const HeaderRight = () => {
    const {user}=useSelector(state=> state.auth);
    const [dropdown,setDropdown]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate()

// Logout Handler
const logoutHandler=()=>{
    setDropdown(false);
    dispatch(logoutUser());
    navigate("/")
}

    return ( 
        <div className="header-right">
       {user ?
       <div className="header-right-user-info">
        <span onClick={()=>{setDropdown(!dropdown)}} className="header-right-username">
            {user?.username}
        </span>
        <img src={user?.profilePhoto.url} 
        alt="user photo" 
        className="header-right-user-photo"
        />
        {dropdown && (
            <div className="header-right-dropdown">
            <Link 
            to={`/profile/${user?.id}`} 
            className="header-dropdown-item"
            onClick={()=>{setDropdown(false)}}
            >
                <i className="bi bi-file-person"></i>
                <span>Profile</span>
            </Link>
            <div className="header-dropdown-item">
                <i className="bi bi-box-arrow-in-left"></i>
               <span onClick={()=>logoutHandler()}>Logout</span>
            </div>
        </div>
        )}
       </div>
       :
        <>
             <Link to='/login' className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span >Login</span>
            </Link>
            <Link to='/register' className="header-right-link">
                <i className="bi bi-person-plus"></i>
                <span>Register</span>
            </Link>
        </>
       }
    </div>
     );
}
 
export default HeaderRight;