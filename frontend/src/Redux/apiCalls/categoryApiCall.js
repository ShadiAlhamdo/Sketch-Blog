import {categoryAction} from "../slices/categorySlice"
import axios from "axios"
import request from '../../Utils/requrst'
import {toast} from "react-toastify"

    

// Fetch All Categories
export function fetchCategories(){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.get(`/api/categories`)

            dispatch(categoryAction.setCategories(data));

            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Create  Category
export function createCategory(newCategory){
    return async (dispatch,getState)=>{
        try{
            
            const {data}=await request.post(`/api/categories`,newCategory,{
                headers:{
                    Authorization:"Bearer "+getState().auth.user.token,
                }
            })

            dispatch(categoryAction.addCategory(data));
            toast.success("Category Creted Successfully");

            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};


// Delete  Category
export function deleteCategory(categoryId){
    return async (dispatch,getState)=>{
        try{
            
            const {data}=await request.delete(`/api/categories/${categoryId}`,{
                headers:{
                    Authorization:"Bearer "+getState().auth.user.token,
                }
            })

            dispatch(categoryAction.deleteCategory(data.CategoryId));
            toast.success(data.message);

            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};
