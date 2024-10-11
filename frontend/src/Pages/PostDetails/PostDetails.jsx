import {Link, useNavigate, useParams} from 'react-router-dom';
import "./PostDetails.css";
import { useEffect, useState } from 'react';
import {toast,ToastContainer} from 'react-toastify';
import AddComment from '../../Components/Comment/AddComment';
import CommentList from '../../Components/Comment/CommentList';
import swal from 'sweetalert';
import UpdatePostModal from './UpdatePostModal';
import {useDispatch,useSelector} from "react-redux";
import { deletePost, fetchSinglePosts ,toggleLikePost, updatePostImage} from '../../Redux/apiCalls/postApiCall';

const PostDetails = () => {

const dispatch=useDispatch();
const {post}=useSelector(state=> state.post);
const {user}=useSelector(state=> state.auth);
const {id}=useParams();
const navigate=useNavigate()

useEffect(()=>{
  window.scrollTo(0,0);
  dispatch(fetchSinglePosts(id));
},[id]);

const [file,setFile]=useState(null);
const [updatepost,setUpdatepost]=useState(false);

const updateImageSubmitHandler=(e)=>{
    e.preventDefault();
    
    if(!file) toast.warning("There No File")

      const formData=new FormData();
      formData.append("image",file)

      dispatch(updatePostImage(formData,post?._id))
   

}

const deletePostHandler=()=>{
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Post!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((isOk) => {
        if (isOk) {
          dispatch(deletePost(post._id));
          navigate(`/profile/${user.id}`)
          
        } else {
          swal("SomeThing Went Wrong");
        }
      });
}
    return (  
        <section className="post-details">
           <div className="post-details-image-wrapper">
               <img src={file?URL.createObjectURL(file): post?.image?.url} alt="" className="post-details-image" />
               {user?.id===post?.user?._id && (
                <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
                <label htmlFor="file" className="update-post-lable">
                    <i className="bi bi-image-fill"></i>
                    Select New Image
                </label>
                <input style={{display:'none'}}
                 type='file' id='file'
                  name='file'
                  onChange={(e)=>{setFile(e.target.files[0])}}
                  />
                <button type="submit">upload</button>
               </form>
               )}
           </div>
           <h1 className="post-details-title">{post?.title}</h1>
           <div className="post-details-user-info">
                <img src={post?.user?.profilePhoto?.url} alt="" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
           </div>
           <p className="post-details-description">
            {post?.description}
           </p>
           <div className="post-details-icon-wrapper">
            <div>
               {user &&(
                 <i 
                 onClick={()=>{dispatch(toggleLikePost(post?._id))}}
                 className={
                  post?.likes?.includes(user?.id)
                  ?"bi bi-hand-thumbs-up-fill"
                  :
                  "bi bi-hand-thumbs-up"
                 }></i>
               )}
                <small>{post?.likes?.length} likes</small>
            </div>
            {user?.id===post?.user?._id &&(
              <div>
              <i onClick={()=>{setUpdatepost(true)}} className="bi bi-pencil-square"></i>
              <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
              </div>
            )}
           </div>
           {user ?
                <AddComment postId={post?._id}/>:<p className='post-details-info-write'>To Write Comment You Should Login first</p>
           }
           <CommentList comments={post?.comments}/>
          {updatepost &&  <UpdatePostModal post={post} setUpdatepost={setUpdatepost}/>}
        </section>
    );
}
 
export default PostDetails;