import {profileAction} from "../slices/ProfileSlice"
import axios from "axios"
import request from '../../Utils/requrst'
import {toast} from "react-toastify"
import { authAction } from "../slices/authSlice"
import { json } from "react-router-dom"

    

// Get User Profile
export function getuserProfile(userId){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.get(`/api/users/profile/${userId}`)

            dispatch(profileAction.setprofile(data));
            
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Upload  Profile Photo
export function uploadProfilePhoto(newPhoto){
    return async (dispatch,getState)=>{
        try{
          
            const {data}=await request
            .post(`/api/users/profile/profile-photo-upload`,newPhoto,{
                headers:{
                   Authorization:"Bearer "+ getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            });

            dispatch(profileAction.setprofilePhoto(data.profilePhoto));
            dispatch(authAction.setUserPhoto(data.profilePhoto));
            toast.success(data.message);

            //Modify The User IN local Storage With New Photo

            const user=JSON.parse(localStorage.getItem("userInfo"));

            user.profilePhoto=data.profilePhoto;

            localStorage.setItem("userInfo",JSON.stringify(user));
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Update   Profile 
export function updateProfile(userId,profile){
    return async (dispatch,getState)=>{
        try{
          
            const {data}=await request
            .put(`/api/users/profile/${userId}`,profile,{
                headers:{
                   Authorization:"Bearer "+ getState().auth.user.token,
                }
            });

            dispatch(profileAction.updateProfile(data));
            dispatch(authAction.setUserName(data.username));

            //Modify The User IN local Storage With New Photo

            const user=JSON.parse(localStorage.getItem("userInfo"));

            user.username=data.username;

            localStorage.setItem("userInfo",JSON.stringify(user));
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Delete   Profile  (Account)
export function deleteProfile(userId){
    return async (dispatch,getState)=>{
        try{
            
            dispatch(profileAction.setLoading());
            const {data}=await request
            .delete(`/api/users/profile/${userId}`,{
                headers:{
                   Authorization:"Bearer "+ getState().auth.user.token,
                }
            });

            dispatch(profileAction.setIsProfileDeleted());
            toast.success(data.message)
            setTimeout(()=>dispatch(profileAction.clearIsProfileDeleted()),2000)

        }
        catch(error){
            toast.error(error.response.data.message);
            dispatch(profileAction.clearLoading());
        }
    }
};

// Get Users Count For Admin Dashboard
export function getUsersCount(){
    return async (dispatch,getState)=>{
        try{
            
            const {data}=await request.get(`/api/users/count`,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                },
            })
            dispatch(profileAction.setUserCount(data.count)); 
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Get Users Proflies For Admin Dashboard
export function getAllUsersProflie(){
    return async (dispatch,getState)=>{
        try{
            
            const {data}=await request.get(`/api/users/profile`,{
                headers:{
                    Authorization:"Bearer "+ getState().auth.user.token,
                },
            })

            dispatch(profileAction.setProfiles(data)); 
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

