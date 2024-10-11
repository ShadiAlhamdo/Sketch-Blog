import { useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../Redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
    const dispatch=useDispatch();
    const [title,setTitle]=useState("")

    // Create New Category Handler
    const formSubmitHandler=(e)=>{
        e.preventDefault();
        if(title.trim()==="")return toast.error("Category Title Is Empty");
        dispatch(createCategory({title}))
        setTitle("")

    }
    return (
        <div className="add-category">
            <div className="add-category-title">Add New Category</div>
            <form onSubmit={formSubmitHandler} >
                <div className="add-category-form-group">
                    <label htmlFor="">Category Title</label>
                    <input type="text"
                    value={title}
                    id="title"
                    placeholder="Enter Category Title"
                    onChange={(e)=>{setTitle(e.target.value)}}
                    />
                </div>
                <button className="add-category-btn" type="submit">Add</button>
            </form>
        </div>
      );
}
 
export default AddCategoryForm;