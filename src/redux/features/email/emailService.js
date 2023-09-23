import axios from "axios";
//we got backend url from auth services which we just imported
import { API_URL } from "../auth/authService";



const sendAutomatedEmail = async ( userData )=>{

    const response = await axios.post( API_URL + "sendAutomatedEmail" , userData)
    return response.data.mssg
}


const emailService = {
    sendAutomatedEmail
}

export default emailService