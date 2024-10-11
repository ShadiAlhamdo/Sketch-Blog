import { useEffect, useState } from "react";
import "./CommentList.css"
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment";
import {useDispatch,useSelector} from "react-redux";
import { deleteComment } from "../../Redux/apiCalls/commentAoiCall";

const CommentList = ({comments}) => {
    const {user}=useSelector(state=> state.auth);
    const [updatecomment,setUpdatecomment]=useState(false);
    const [commentForUpdate,setcCommentForUpdate]=useState(null);
    const dispatch=useDispatch();

    // Update Comment Handler
    const updateCommentHandler=(comment)=>{
      setcCommentForUpdate(comment)
      setUpdatecomment(true)
    }
    // Delete Comment Handler
    const deleteCommentHandler=(commentId)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Commnet",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
             dispatch(deleteComment(commentId))
            } 
          });
    }
    useEffect(()=>{

    },[comments])
    return ( 
        <div className="comment-list">
            <h4 className="comment-list-count">{comments?.length} Comments</h4>
            {comments?.map((comment)=>(
                <div key={comment?._id} className="comment-item">
                  <div className="comment-item-info">
                    <div className="comment-item-username">
                        {comment?.username}
                    </div>
                    <div className="comment-item-time">
                        <Moment fromNow ago>
                        {comment?.createdAt}
                        </Moment>{" "}ago
                    </div>
                  </div>
                  <p className="comment-item-text">
                    {comment?.text}
                    
                  </p>
                  {comment?.user===user?.id&&(
                    <div className="comment-item-icon-wrapper">
                    <i onClick={()=>{updateCommentHandler(comment)}} className="bi bi-pencil-square"></i>
                    <i onClick={()=>{deleteCommentHandler(comment._id)}} className="bi bi-trash-fill"></i>
                    </div>
                  )}
                </div>
            ))}
            {updatecomment && <UpdateCommentModal
             commentForUpdate={commentForUpdate} 
             setUpdatecomment={setUpdatecomment}/>}
        </div>
     );
}
 
export default CommentList;