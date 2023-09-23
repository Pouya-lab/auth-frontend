import React, { useState } from "react";
import Card from "../../components/card/Card";
import profileImg from "../../assets/avatarr.png";
import "./ChangePassword.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { toast } from "react-toastify";
import { RESET, changePass, logout } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";


const initialState = {
  oldPassword : '' ,
  password : '' ,
  password2 : ''
}

const ChangePassword = () => {

  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const updatePassword = async(e)=>{
    e.preventDefault()

    if(!oldPassword || !password || !password2 ){
      return toast.error("should fill all the fields")
    }

    if(password !== password2){
      return toast.error("passwords do not match")
    }

    const userData = {
      oldPassword ,
      password
    }

    const emailData = {
      subject : "Password Changed - AUTH:Pouya" ,
      send_to : user.email ,
      reply_to : "noreply@pobh.com",
      template : "changePass" ,
      url : "/forgot"
    }

    await dispatch(changePass(userData))
    await dispatch(sendAutomatedEmail(emailData))
    await dispatch(logout())
    await dispatch(RESET(userData))
    navigate("/login")

  }

  const { isLoading , user } = useSelector((state => state.auth))

  return (
    <>
      <section>
        <div className="container">
          <PageMenu />
          <h2>Change Password</h2>
          <div className="--flex-start change-password">
            <Card cardClass={"card"}>
              <>
                <form onSubmit={updatePassword}>
                  <p>
                    <label>Current Password</label>
                    <PasswordInput
                      placeholder="Old Password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>New Password:</label>
                    <PasswordInput
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </p>
                  <p>
                    <label>confirm New Password:</label>
                    <PasswordInput
                      placeholder="Confirm Password"
                      name="password2"
                      value={password2}
                      onChange={handleInputChange}
                    />
                  </p>
                    <button type="submit" className='--btn --btn-danger w-full'>
                          Change Password
                    </button>
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
