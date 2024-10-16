import { useEffect, useState } from 'react';
import './CreatePost.css';
import {toast,ToastContainer} from "react-toastify";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { createPost } from '../../Redux/apiCalls/postApiCall';
import { RotatingLines, TailSpin } from 'react-loader-spinner';
import { fetchCategories } from '../../Redux/apiCalls/categoryApiCall';
const CreatePost = () => {
const dispatch=useDispatch();

const {loading,isPostCreated}=useSelector(state=> state.post)
const {categories}=useSelector(state=> state.category);

useEffect(()=>{
    dispatch(fetchCategories());
})

const[title,setTitle]=useState("");
const[description,setDescription]=useState("");
const[category,setCategory]=useState("");
const [file,setFile]=useState((null));

// Form Submit handler //
const formsubmitHandler=(e)=>{
    e.preventDefault();

    if(title.trim()=="") toast.error("Title is Require")
    if(category.trim()=="") toast.error("Category is Require")
    if(description.trim()=="")toast.error("Description is Require")
    if(!file)toast.error("File is Require")

    const formData=new FormData();
    formData.append("image",file);
    formData.append("title",title);
    formData.append("description",description);
    formData.append("category",category);

    dispatch(createPost(formData));
};
const navigate=useNavigate();
useEffect(()=>{
    if(isPostCreated){
        navigate("/");
    }
},[isPostCreated,navigate])

    return ( 
        <section className="create-post">
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <form onSubmit={formsubmitHandler} className="create-post-form">
                <input type="text" placeholder="Post Title "
                className="create-post-input"  
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
                <select   value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
                name="" id=""
                 className="create-post-input"
                 >
                    <option disabled value="">Select A Ctegory</option>
                    {categories.map(category=>
                        <option key={category._id} value={category.title}>
                            {category.title}
                        </option>
                    )}
                </select>
                <textarea rows='5' 
                className="create-post-textarea"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                ></textarea>
                <input type="file" name="file" id="file"
                className="create-post-upload"
                onChange={(e)=>{setFile(e.target.files[0])}}
                />
                <button type="submit"
                 className="create-post-btn"
                 >
                    {loading ? <RotatingLines
                                visible={true}
                                height="96"
                                width="96"
                                color="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                />:
                                "Create"}
                </button>
            </form>
        </section>
     );
}
 
export default CreatePost;