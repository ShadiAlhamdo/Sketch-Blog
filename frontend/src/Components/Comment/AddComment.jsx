import { useState } from "react";
import "./AddComment.css"
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { CreateComment } from "../../Redux/apiCalls/commentAoiCall";

const AddComment = ({postId}) => {
    const dispatch=useDispatch();
    const [text,setText]=useState("");

    const formSubmitHandler=(e)=>{
        e.preventDefault();
        if(text.trim()=='') return toast.error("Please Write SomeThing")

            dispatch(CreateComment({text,postId}))
            setText("")
    }
    return ( 
        <form onSubmit={formSubmitHandler}  className="add-comment">
            <input type="text"
             placeholder="Add A Comment"
             className="add-comment-input"
             value={text}
             onChange={(e)=>{setText(e.target.value)}}
              />
              <button type="submit" className="add-comment-btn">
                Comment
              </button>
        </form>
     );
}
 
export default AddComment;