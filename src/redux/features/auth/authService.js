//execute api requests connect to backend for the needed requests

import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
//API means our backend code so we can connect to it
export const API_URL = `${BACKEND_URL}/api/users/`

// checking Validate email in frontend and then allows it to send the data to backend
export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

//register user
//userData is an object which stores users data in front to send the data to the server
const register = async ( userData )=>{
        //needs a link to send data and 2nd argument for data
        //api_url is the link to backend and after that we use register function which we created in the back and we call it to work for register page and send the users data with userData to control the data from front to back
        const response = await axios.post( API_URL + "register" , userData)
        return response.data
}

//login user
const login = async ( userData)=>{
  const response = await axios.post( API_URL + "login" , userData)
  return response.data
}

const logout = async (  )=>{
//for logout we use get request
  const response = await axios.get( API_URL + "logout")
  return response.data.mssg
  //in backend we send a response as a message and we get the data as message in the format that we declared as json
}

const getLoginStatus = async()=>{
  const response = await axios.get( API_URL + "loginStatus")
  return response.data
}

const getUser = async()=>{
  const response = await axios.get( API_URL + "getUser")
  return response.data
}

const updateUser = async(userData)=>{
  const response = await axios.patch( API_URL + "updateUser" , userData)
  return response.data
}

//send verification email
const sendVerificationEmail = async()=>{
  const response = await axios.post( API_URL + "sendVerificationEmail")
  return response.data.mssg
}

const verifyUser = async(verificationToken)=>{
  //this format is for the token that we recieve from back and need to be on params 
  const response = await axios.patch( `${API_URL}verifyUser/${verificationToken}`  )
  return response.data.mssg
}

const changePass = async(userData)=>{
  const response = await axios.patch( API_URL + "changePass" , userData )
  return response.data.mssg
}

const forgotPass = async(userData)=>{
  const response = await axios.post( API_URL + "forgotPass" , userData )
  return response.data.mssg
}

const resetPass = async(userData , resetToken)=>{
  const response = await axios.patch( `${API_URL}/resetPass/${resetToken}` , userData )
  return response.data.mssg
}

const getUsers = async()=>{
  const response = await axios.get( API_URL + "getUsers" )
  return response.data
}

const deleteUser = async(id)=>{
  const response = await axios.delete( API_URL + id )
  return response.data.mssg
}

const upgradeUser = async(userData)=>{
  const response = await axios.post( API_URL + "upgradeUser" , userData )
  return response.data.mssg
}

const sendLoginCode = async(email)=>{
  const response = await axios.post( API_URL + `sendLoginCode/${email}` , email )
  return response.data.mssg
}

const loginWithCode = async({code , email})=>{
  const response = await axios.post( API_URL + `loginWithCode/${email}` , code )
  return response.data
}


const authService = {
    register,
    login ,
    logout,
    getLoginStatus,
    getUser,
    updateUser,
    sendVerificationEmail,
    verifyUser ,
    changePass,
    forgotPass,
    resetPass,
    getUsers ,
    deleteUser ,
    upgradeUser ,
    sendLoginCode,
    loginWithCode
}

export default authService

