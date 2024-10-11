import { useState } from 'react';
import './UpdateProfileModal.css'
import { toast } from 'react-toastify';
import {useDispatch} from "react-redux"
import { updateProfile } from '../../Redux/apiCalls/profileApiCall';
const UpdateProfileModal = ({profile,setUpdateProfile}) => {

const dispatch=useDispatch();

const [username,setUsername]=useState(profile.username);
const [bio,setBio]=useState(profile.bio);
const [password,setPassword]=useState("");



const formSubmitHandler=(e)=>{
    e.preventDefault();
  

    if(username.trim()=="")return toast.error("Username is Empty")
    if(bio.trim()==="")return toast.error("Bio is Empty")
    const updatedUser={username,bio}

    if(password.trim()!==""  && password.length >= 8 ){
        updatedUser.password=password;
    }
        dispatch(updateProfile(profile._id,updatedUser));
        setUpdateProfile(false);
}

    return ( 
        <div className="update-post">
            <form onSubmit={formSubmitHandler} className="update-post-form">
                <abbr title="close">
                    <i onClick={()=>setUpdateProfile(false)}
                     className="bi bi-x-circle-fill update-post-form-close"
                     >  
                     </i>
                </abbr>
                <h1 className="update-post-title">Update Profile</h1>
                <input 
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                type="text" 
                className="update-post-input" 
                />
               
                <textarea 
                value={bio}
                onChange={(e)=>{setBio(e.target.value)}}
                rows="5" 
                placeholder='You`r Bio'
                className='update-post-textarea'
                >
                </textarea>
                <input 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password" 
                placeholder='Type Your New Password If You Want Changed It'
                className="update-post-input" 
                />
                <button type="submit" className='update-post-btn'>Update Profile</button>
            </form>
        </div>
     );
}
 
export default UpdateProfileModal;