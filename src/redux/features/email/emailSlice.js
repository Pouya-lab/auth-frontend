import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import emailService from './emailService';


const initialState = {
    sendingEmail : false ,
    emailSent : false ,
    msg : ""
}



export const sendAutomatedEmail = createAsyncThunk(
    "email/sendAutomatedEmail",
    async(userData , thunkAPI)=>{
  
        try {
          return await emailService.sendAutomatedEmail(userData)
        } 
        catch (error) {
          //error message can be different in different api's so for getting error message we make these kind of error catching
          const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()
          return thunkAPI.rejectWithValue(message)
        }
  
    }
  )

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET(state)  {
        state.sendingEmail = false 
        state.emailSent = false 
        state.msg = ""
    }
  },
  extraReducers : (builder) => {
    builder
    
.addCase(sendAutomatedEmail.pending , (state , action) =>{
    state.sendingEmail = true 
  })
  .addCase(sendAutomatedEmail.fulfilled , (state , action) =>{
      state.sendingEmail = false  
      state.emailSent = true 
      state.msg = action.payload 
      toast.success(action.payload)
  })
  .addCase(sendAutomatedEmail.rejected , (state , action) =>{
    state.sendingEmail = false 
    state.emailSent = false 
    //TODO toast is not showing the email send message
    state.msg = action.payload
    toast.error(action.payload);
  })
  }
});

export const {EMAIL_RESET} = emailSlice.actions

export default emailSlice.reducer