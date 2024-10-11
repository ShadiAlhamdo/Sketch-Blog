import {postAction} from "../slices/postSlice"
import axios from "axios"
import request from '../../Utils/requrst'
import {toast} from "react-toastify"
import { commentAction } from "../slices/commentSlice"

    

// Create Comment
export function CreateComment(newComment){
    return async (dispatch,getState)=>{
        try{
          
            const {data}=await request.post(`/api/comments`,newComment,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                 }
                
            });

            dispatch(postAction.addCommentToPost(data));
            toast.success("Comment Added Successfully");
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};


// Update Comment
export function updateComment(commentId,comment){
    return async (dispatch,getState)=>{
        try{
          
            const {data}=await request.put(`/api/comments/${commentId}`,comment,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                 }
                
            });

            dispatch(postAction.updateCommentPost(data));
            toast.success("Comment Updated Successfully");
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};


// Delete Comment
export function deleteComment(commentId){
    return async (dispatch,getState)=>{
        try{
           await request.delete(`/api/comments/${commentId}`,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                 }
                
            });
            dispatch(commentAction.deleteComment(commentId));
            dispatch(postAction.deleteCommentFromPost(commentId));
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Fetch All Comments
export function fetchAllComment(){
    return async (dispatch,getState)=>{
        try{
          
            const {data}=await request.get(`/api/comments`,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                 }
                
            });
                
            dispatch(commentAction.setComments(data));
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};