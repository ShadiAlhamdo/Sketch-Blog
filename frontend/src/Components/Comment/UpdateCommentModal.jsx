import { useState } from 'react';
import './UpdateCommentModal.css'
import { toast } from 'react-toastify';
import {useDispatch,useSelector} from "react-redux";
import { updateComment } from '../../Redux/apiCalls/commentAoiCall';

const UpdateCommentModal = ({commentForUpdate,setUpdatecomment}) => {
const dispatch=useDispatch();
const [text,setText]=useState(commentForUpdate.text);


const formSubmitHandler=(e)=>{
    e.preventDefault();


    if(text.trim()=="")return toast.error("Please Write SomeThing")
   

        dispatch(updateComment(commentForUpdate._id,{text}));
        setUpdatecomment(false);
}

    return ( 
        <div className="update-comment">
            <form onSubmit={formSubmitHandler} className="update-comment-form">
                <abbr title="close">
                    <i onClick={()=>setUpdatecomment(false)}
                     className="bi bi-x-circle-fill update-comment-form-close"
                     >  
                     </i>
                </abbr>
                <h1 className="update-comment-title">Edit Comment</h1>
                <input 
                value={text}
                onChange={(e)=>{setText(e.target.value)}}
                type="text" 
                className="update-comment-input" 
                />
                <button type="submit" className='update-comment-btn'>Update Comment</button>
            </form>
        </div>
     );
}
 
export default UpdateCommentModal;