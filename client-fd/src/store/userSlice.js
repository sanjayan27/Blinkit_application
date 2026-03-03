import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id : "",
    name:"",
    email : "",
    mobile:"",
    avatar:"",
    verify_email:"",
    status:"",
    last_login_date:"",
    address_details :[],
    shoping_cart:[],
    orderHistory: [],
    role: "",


}

const userSlice = createSlice({
    name : "user",
    initialState : initialValue,
    reducers : {
         setUserDetails : (state,action)=>{
            state._id = action.payload?._id;
            state.name = action.payload?.name;
            state.email = action.payload?.email;
            state.mobile= action.payload?.mobile;
            state.avatar = action.payload?.avatar;
            state.verify_email = action.payload?.verify_email;
            state.status = action.payload?.status;
            state.last_login_date = action.payload?.last_login_date;
            state.address_details = action.payload?.address_details;
            state.shoping_cart = action.payload?.shoping_cart
            state.orderHistory = action.payload?.orderHistory
            state.role = action.payload?.role
         },
         logout: (state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.mobile = "";
            state.avatar = "";
            state.verify_email = "";
            state.status = "";
            state.last_login_date = "";
            state.address_details = [];
            state.shoping_cart = [];
            state.orderHistory = [];
            state.role = "";
         }
    }

})

export const { setUserDetails,logout } = userSlice.actions

export default userSlice.reducer