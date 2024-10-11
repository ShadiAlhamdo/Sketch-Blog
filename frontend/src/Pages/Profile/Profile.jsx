import { useEffect, useState } from 'react';
import './Profile.css'
import {useDispatch,useSelector} from "react-redux"
import { toast } from 'react-toastify';
import { deleteProfile, getuserProfile, uploadProfilePhoto } from '../../Redux/apiCalls/profileApiCall';
import { useParams,useNavigate } from 'react-router-dom';
import swal from "sweetalert"
import UpdateProfileModal from './UpdateProfileModal';
import PostItem from '../../Components/Posts/PostItem';
import { Oval } from 'react-loader-spinner';
import { logoutUser } from '../../Redux/apiCalls/authApiCall';
const Profile = () => {

const dispatch=useDispatch();
const {profile,loading,isProfileDeleted}=useSelector(state=>state.profile);
const {user}=useSelector(state=>state.auth);
const {id}=useParams();

const [file,setFile]=useState(null);
const [updateProfile,setUpdateProfile]=useState(false);


useEffect(()=>{
    dispatch(getuserProfile(id));
    window.scrollTo(0,0);
},[]);

const navigate=useNavigate()
useEffect(()=>{
 if(isProfileDeleted){
  navigate("/")
 }
},[navigate,isProfileDeleted]);


// Update Proflie Photo
const formSubmiHandler=(e)=>{
    e.preventDefault();

    if(!file) return toast.warning("ther is no file");

    const formDate=new FormData();

    formDate.append("image",file);

    dispatch(uploadProfilePhoto(formDate));
}
// Dlete Proflie (Account)
const deleteAccounthandler=()=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Acoount !", 
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((isOk) => {
        if (isOk) {
         dispatch(deleteProfile(user?.id));
         dispatch(logoutUser());
        } 
      });
}
if(loading){
  return(
    <div className='profile-loader'>
      <Oval
  visible={true}
  height="120"
  width="120"
  color="#000"
  ariaLabel="gray"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}
    return ( 
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img 
                    src={file ?URL.createObjectURL(file):profile?.profilePhoto.url}
                     alt=""
                      className="profile-image" 
                    />
                   {
                    user?.id===profile?._id &&(
                        <form onSubmit={formSubmiHandler}>
                            <abbr title="choose profile photo">
                                <label htmlFor="file" 
                                className='bi bi-camera-fill upload-profile-photo-icon'
                                >
                                </label>
                            </abbr>
                            <input
                            type="file" 
                            name='file'
                            id='file' 
                            onChange={(e)=>{setFile(e.target.files[0])}}
                            className='profile-upload-display-none'
                            />
                            <button type="submit" className='upload-profile-photo-btn'>Upload Pphoto</button>
                        </form>
                    )
                   }
                </div>
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">
                    {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined:</strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>
                {
                    user?.id===profile?._id &&(
                    <button onClick={()=>{setUpdateProfile(true)}} className='profile-update-btn'>
                    <i  className="bi bi-file-person-fill"></i>
                    Update Profile
                    </button>
                    )
                }
            </div>
            <div className="profile-posts-list">
                <h2 className='profile-posts-title'>{profile?.username} Posts:</h2>
              {profile?.posts?.map(post=>
                <PostItem 
                key={post?._id} 
                 post={post}
                 username={profile?.username}
                 userId={profile?._id}
                 />
              )}
            </div>
            {
                  user?.id===profile?._id &&(
                <button onClick={deleteAccounthandler} className="delete-acoount-btn">
                Delete You`r Account
                </button>
                )
            }
            {updateProfile &&  <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile}/>}
        </section>
     );
}


export default Profile;