import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';
import { toast } from 'react-toastify';

//extra reducers are for the times to wnat to send http requests but normal reducer is for going through what we have now

const initialState = {
    isLoggedIn : false , 
    user : null ,
    users : [],
    twoFactor : false,
    isError : false ,
    isSuccess : false ,
    isLoading : false ,
    message : "" ,
    verifiedUsers : 0 ,
    suspendedUsers : 0 ,
    
}

//register User
export const register = createAsyncThunk(
  "auth/register",
  async(userData , thunkAPI)=>{

      try {
        return await authService.register(userData)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

//login User
export const login = createAsyncThunk(
  "auth/login",
  async(userData , thunkAPI)=>{

      try {
        return await authService.login(userData)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)


//logout User
export const logout = createAsyncThunk(
  "auth/logout",
  //when we dont send data to backend for second argument we set _  . we dont leave it empty 
  async( _ ,thunkAPI )=>{

      try {
        return await authService.logout()
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

//get login status User
//when we dont send data to backend for second argument we set _  . we dont leave it empty 
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async( _ ,thunkAPI )=>{

      try {
        return await authService.getLoginStatus()
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const getUser = createAsyncThunk(
  "auth/getUser",
  async( _ ,thunkAPI )=>{

      try {
        return await authService.getUser()
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async( userData ,thunkAPI )=>{

      try {
        return await authService.updateUser(userData)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async( _ ,thunkAPI )=>{

      try {
        return await authService.sendVerificationEmail()
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async( verificationToken ,thunkAPI )=>{

      try {
        return await authService.verifyUser(verificationToken)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const changePass = createAsyncThunk(
  "auth/changePass",
  async( userData ,thunkAPI )=>{

      try {
        return await authService.changePass(userData)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)



export const forgotPass = createAsyncThunk(
  "auth/forgotPass",
  async( userData ,thunkAPI )=>{

      try {
        return await authService.forgotPass(userData)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const resetPass = createAsyncThunk(
  "auth/resetPass",
  async( { userData , resetToken } ,thunkAPI )=>{

      try {
        return await authService.resetPass(userData , resetToken)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async( _ ,thunkAPI )=>{

      try {
        return await authService.getUsers()
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async( id ,thunkAPI )=>{

      try {
        return await authService.deleteUser(id)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const upgradeUser = createAsyncThunk(
  "auth/upgradeUser",
  async( userData ,thunkAPI )=>{

      try {
        return await authService.upgradeUser(userData)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const sendLoginCode = createAsyncThunk(
  "auth/sendLoginCode",
  async( email ,thunkAPI )=>{

      try {
        return await authService.sendLoginCode(email)
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

export const loginWithCode = createAsyncThunk(
  "auth/loginWithCode",
  async( {code , email} ,thunkAPI )=>{

      try {
        return await authService.loginWithCode({code , email})
      } 
      catch (error) {
        //error message can be different in different api's so for getting error message we make these kind of error catching
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

      RESET(state){
        state.twoFactor = false
        state.isError = false 
        state.isSuccess = false 
        state.isLoading = false 
        state.message = "" 
      },
      CALC_VERIFIED_USERS(state , action){
        const array = []

        state.users.map((user)=>{
            const { isVerified } = user
            return array.push(isVerified)
        })
        let count = 0
        array.forEach((item)=>{
          if( item === true ){
            count += 1
          }
        })
        state.verifiedUsers = count

      },
      CALC_SUSPENDED_USERS(state , action){
        const array = []

        state.users.map((user)=>{
            const { role } = user
            return array.push(role)
        })
        let count = 0
        array.forEach((item)=>{
          if( item === "suspended" ){
            count += 1
          }
        })
        state.suspendedUsers = count
      }

  },
  extraReducers : ( builder )=>{
    //extra reducers controlls if the register is working fine or not to send the info to state
    //builder handle different responses that we get when we make request
    builder
    .addCase(register.pending , (state , action) =>{
      state.isLoading = true 
    })
    .addCase(register.fulfilled , (state , action) =>{
        state.isLoading = false  
        state.isSuccess = true 
        state.isLoggedIn = true 
        //action below gets users details
        state.user = action.payload 
        toast.success("registration successful")
        console.log(action.payload);
    })
    .addCase(register.rejected , (state , action) =>{
      state.isLoading = false 
      state.isError = true 
      state.message = action.payload
      state.user = null
      toast.error(action.payload)
      //goes to form and sees if there is an error and if that error has returned by a toast.error and shows that message as a payload
      //with payload we get the data we need from redux and payload sends them to us
  })
  //for login user
  .addCase(login.pending , (state , action) =>{
    state.isLoading = true 
  })
  .addCase(login.fulfilled , (state , action) =>{
      state.isLoading = false  
      state.isSuccess = true 
      state.isLoggedIn = true 
      //action below gets users details
      state.user = action.payload 
      toast.success("login successful")
      console.log(action.payload);
  })
  .addCase(login.rejected , (state , action) =>{
    state.isLoading = false 
    state.isError = true 
    state.message = action.payload
    state.user = null
    toast.error(action.payload)
    //goes to form and sees if there is an error and if that error has returned by a toast.error and shows that message as a payload
    //with payload we get the data we need from redux and payload sends them to us
    
    //for two factor authentication
    if(action.payload.includes("login code")){
      state.twoFactor = true
    }
})
.addCase(logout.pending , (state , action) =>{
  state.isLoading = true 
})
.addCase(logout.fulfilled , (state , action) =>{
    state.isLoading = false  
    state.isSuccess = true 
    state.isLoggedIn = false 
    //action below gets users details
    state.user = null
    toast.success(action.payload)
    //we get message straight from back so we dont need to write any message here
})
.addCase(logout.rejected , (state , action) =>{
  state.isLoading = false 
  state.isError = true 
  state.message = action.payload
  toast.error(action.payload)
})
.addCase(getLoginStatus.pending , (state , action) =>{
  state.isLoading = true 
})
.addCase(getLoginStatus.fulfilled , (state , action) =>{
    state.isLoading = false  
    state.isSuccess = true 
    state.isLoggedIn = action.payload 
})
.addCase(getLoginStatus.rejected , (state , action) =>{
  state.isLoading = false 
  state.isError = true 
  state.message = action.payload
  console.log(action.payload);
})
.addCase(getUser.pending , (state , action) =>{
  state.isLoading = true 
})
.addCase(getUser.fulfilled , (state , action) =>{
    state.isLoading = false  
    state.isSuccess = true 
    state.isLoggedIn = true
    state.user = action.payload 
})
.addCase(getUser.rejected , (state , action) =>{
  state.isLoading = false 
  state.isError = true 
  state.message = action.payload
  toast.error(action.payload)
})
.addCase(updateUser.pending, (state) => {
  state.isLoading = true;
})
.addCase(updateUser.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isLoggedIn = true;
  state.user = action.payload;
  toast.success("User Updated");
})
.addCase(updateUser.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(sendVerificationEmail.pending, (state) => {
  state.isLoading = true;
})
.addCase(sendVerificationEmail.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload);
})
.addCase(sendVerificationEmail.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(verifyUser.pending, (state) => {
  state.isLoading = true;
})
.addCase(verifyUser.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload);
})
.addCase(verifyUser.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})

.addCase(changePass.pending, (state) => {
  state.isLoading = true;
})
.addCase(changePass.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload);
})
.addCase(changePass.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})

.addCase(forgotPass.pending, (state) => {
  state.isLoading = true;
})
.addCase(forgotPass.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload);
})
.addCase(forgotPass.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(resetPass.pending, (state) => {
  state.isLoading = true;
})
.addCase(resetPass.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload);
})
.addCase(resetPass.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(getUsers.pending, (state) => {
  state.isLoading = true;
})
.addCase(getUsers.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.users = action.payload;
})
.addCase(getUsers.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})

.addCase(deleteUser.pending, (state) => {
  state.isLoading = true;
})
.addCase(deleteUser.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload)
})
.addCase(deleteUser.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(upgradeUser.pending, (state) => {
  state.isLoading = true;
})
.addCase(upgradeUser.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload)
})
.addCase(upgradeUser.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(sendLoginCode.pending, (state) => {
  state.isLoading = true;
})
.addCase(sendLoginCode.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload;
  toast.success(action.payload)
})
.addCase(sendLoginCode.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  toast.error(action.payload);
})
.addCase(loginWithCode.pending, (state) => {
  state.isLoading = true;
})
.addCase(loginWithCode.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.isLoggedIn = true
  state.twoFactor = false
  state.user = action.payload;
  toast.success(action.payload)
})
.addCase(loginWithCode.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.user = null;
  toast.error(action.payload);
})





  }

});




export const { RESET , CALC_VERIFIED_USERS , CALC_SUSPENDED_USERS } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn

export const selectUser = (state) => state.auth.user

export default authSlice.reducer