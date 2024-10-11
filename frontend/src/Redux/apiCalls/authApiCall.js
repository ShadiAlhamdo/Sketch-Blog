import {authAction} from "../slices/authSlice"
import axios from "axios"
import request from '../../Utils/requrst'
import {toast} from "react-toastify"
import { profileAction } from "../slices/ProfileSlice"

    

// Login User
export function loginUser(user){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.post(`/api/auth/login`,user)

            dispatch(authAction.login(data));
            localStorage.setItem("userInfo",JSON.stringify(data));
            toast.success("Login Successfuly")
            
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Logout User

export function logoutUser(user){
    return async (dispatch)=>{
       dispatch(authAction.logout());
       localStorage.removeItem("userInfo");
       dispatch(authAction.register(null));
       dispatch(profileAction.setprofile(null));

    }
};


// Register User
export function registerUser(user){
    return async (dispatch)=>{
        try{
            
            const {data}=await request.post(`/api/auth/register`,user)

            dispatch(authAction.register(data.message));
            toast.success(data.message)
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};

// Verify Email
export function verifyEmail(userId,token){
    return async (dispatch)=>{
        try{
            
           await request.post(`/api/auth/${userId}/verify/${token}`)

            dispatch(authAction.setIsEmailVerfied());
            toast.success("Login Successfuly")
            
            
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
};