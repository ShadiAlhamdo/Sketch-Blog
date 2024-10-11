import { createSlice} from "@reduxjs/toolkit"

const profileSlice=createSlice({
    name:"profile",
    initialState:{
        profile:null,
        loading:false,
        isProfileDeleted:false,
        usersCount:null,
        profiles:[],
    
    },
    reducers:{
       setprofile(state,action){ 
        state.profile=action.payload;
       },
       setprofilePhoto(state,action){
        state.profile.profilePhoto=action.payload;
       },
       updateProfile(state,action){
        state.profile=action.payload;
       },
       setLoading(state,action){
        state.loading=true;
       },
       clearLoading(state,action){
        state.loading=false;
       },
       setIsProfileDeleted(state,action){
        state.isProfileDeleted=true;
        state.loading=false
       },
       clearIsProfileDeleted(state,action){
        state.isProfileDeleted=false;
       },
       setUserCount(state,action){
        state.usersCount=action.payload;
       },
       setProfiles(state,action){
        state.profiles=action.payload;
       }
    }
});


const profileReducer=profileSlice.reducer;
const profileAction=profileSlice.actions;

export {profileAction,profileReducer}
