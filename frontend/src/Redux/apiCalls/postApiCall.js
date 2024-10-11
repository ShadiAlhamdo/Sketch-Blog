import {postAction} from "../slices/postSlice"
import axios from "axios"
import request from '../../Utils/requrst'
import {toast} from "react-toastify"

    

// Fecth Posts Base On Page Number
export function fetchPosts(pageNumber){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.get(`/api/posts?pageNumber=${pageNumber}`)
            dispatch(postAction.setPosts(data));
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};


// Fet Posts Count
export function getPostsCount(){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.get(`/api/posts/count`)
            dispatch(postAction.setPostsCount(data.count));
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};


// Fecth Posts Base On Category 
export function fetchPostsBaseOnCategory(category){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.get(`/api/posts?category=${category}`)
            dispatch(postAction.setPostsCate(data));
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Create Post
export function createPost(newPost){
    return async (dispatch,getState)=>{
        try{
                dispatch(postAction.setLoading());
            await request.post(`/api/posts`,newPost,{
                headers:{
                    Authorization:"Beare "+ getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            });

            dispatch(postAction.setIsPostCreated());
            setTimeout(()=>dispatch(postAction.clearIsPostCreated()),2000);  // 2 second
            
        }
        catch(error){
            toast.error(error.response.data.message);
            dispatch(postAction.clearLoading());
        }
    }
};


// Fecth Single Post 
export function fetchSinglePosts(postId){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.get(`/api/posts/${postId}`)
            dispatch(postAction.setPost(data));
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Toggle Like  Post 
export function toggleLikePost(postId){

    return async (dispatch,getState)=>{
        try{
            
            const {data}=await request.put(`/api/posts/like/${postId}`,{},{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                 }
                
            });
         
            dispatch(postAction.setLike(data));
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Update  Post Image 
export function updatePostImage(newImage,postId){

    return async (dispatch,getState)=>{
        try{
            
            const {data}=await request.put(`/api/posts/update-image/${postId}`,newImage,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                     "Content-Type" : "multipart/form-data"
                 }
                
            });
            toast.success("New Post Image Uploaded Successfully")

        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};


// Update  Post  
export function updatePost(newPost,postId){

    return async (dispatch,getState)=>{
        try{
            
            const {data}=await request.put(`/api/posts/${postId}`,newPost,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                 }
                
            });
            dispatch(postAction.setPost(data))

        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Delete  Post  
export function deletePost(postId){

    return async (dispatch,getState)=>{
        try{
            
            const {data}=await request.delete(`/api/posts/${postId}`,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                 }
                
            });
            dispatch(postAction.deletePost(data.postId));
            toast.success(data.message);

        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Fecth ALL Posts For Admin Dashboard
export function getAllPosts(){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.get(`/api/posts`)
            dispatch(postAction.setPosts(data));
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};
