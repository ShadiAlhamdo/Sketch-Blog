import { Link, useParams } from "react-router-dom";
import "./VerifyEmail.css"
import {useSelector,useDispatch} from "react-redux"
import { useEffect } from "react";
import { verifyEmail } from "../../Redux/apiCalls/authApiCall";
const VerifyEmail = () => {
    const dispatch=useDispatch();
    const {isEmailVerified}=useSelector(state => state.auth);
    const{userId,token}=useParams();

    useEffect(()=>{
     dispatch( verifyEmail(userId,token));
    },[userId,token])
    return ( 
        <section className="verify-email">
           {isEmailVerified ?
           <>
           <i className="bi bi-patch-check verify-email-icon"></i>
           <h1 className="verify-email-title">
            Your email address has been successfully verified
           </h1>
           <Link to={`/login`} className="verify-email-link" >
            Go To Login Page  
           </Link>
           </>
           :
           <>
           <h1 className="veryfiy-email-not-found">
            Email Not Found
           </h1>
           </>
           }
        </section>
     );
}
 
export default VerifyEmail;