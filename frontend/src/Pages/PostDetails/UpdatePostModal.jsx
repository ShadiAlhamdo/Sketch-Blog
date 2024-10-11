import { useEffect, useState } from 'react';
import './UpdatePostModal.css'
import { toast } from 'react-toastify';
import {useDispatch,useSelector} from "react-redux";
import { updatePost } from '../../Redux/apiCalls/postApiCall';
import { fetchCategories } from '../../Redux/apiCalls/categoryApiCall';

const UpdatePostModal = ({post,setUpdatepost}) => {

const dispatch=useDispatch();
const {categories}=useSelector(state=> state.category);

useEffect(()=>{
    dispatch(fetchCategories());
});


const [title,setTitle]=useState(post.title);
const [description,setDescription]=useState(post.description);
const [category,setCategory]=useState(post.category);

const formSubmitHandler=(e)=>{
    e.preventDefault();


    if(title.trim()=="")return toast.error("Title is Empty")
    if(description.trim()=="")return toast.error("Description is Empty")
    if(category.trim()=="")return toast.error("Category is Empty")
        
       dispatch(updatePost({title,category,description},post?._id));
       setUpdatepost(false);
       window.location.reload();
}

    return ( 
        <div className="update-post">
            <form onSubmit={formSubmitHandler} className="update-post-form">
                <abbr title="close">
                    <i onClick={()=>setUpdatepost(false)}
                     className="bi bi-x-circle-fill update-post-form-close"
                     >  
                     </i>
                </abbr>
                <h1 className="update-post-title">Update Post</h1>
                <input 
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                type="text" 
                className="update-post-input" 
                />
                <select 
                value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
                name="" 
                id=""
                 className="update-post-input"
                 >
                    <option disabled value="">Select A Category</option>
                    {categories.map(category=>
                        <option key={category._id} value={category.title}>
                            {category.title}
                        </option>
                    )}
                </select>
                <textarea 
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                rows="5" 
                className='update-post-textarea'
                >
                </textarea>
                <button type="submit" className='update-post-btn'>Update Post</button>
            </form>
        </div>
     );
}
 
export default UpdatePostModal;