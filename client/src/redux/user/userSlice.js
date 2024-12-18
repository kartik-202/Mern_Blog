import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    error:null,
    loading:false,
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInfailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateStart:(state,action)=>{
            state.loading=true;
            state.error=null; 
        },
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null; 
        },
        updateFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload; 
        },
        deleteUserStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signoutSuccess:(state,action)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        }
    }
})

export const{signInStart,signInSuccess,signInfailure,updateSuccess,updateFailure,updateStart,deleteUserFailure,deleteUserStart,deleteUserSuccess,signoutSuccess}=userSlice.actions;

export default userSlice.reducer;