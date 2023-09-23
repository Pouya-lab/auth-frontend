import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { RESET, forgotPass } from "../../redux/features/auth/authSlice";
import styles from "./auth.module.scss";

const Forgot = () => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState("");

  const forgot = async(e) =>{
    e.preventDefault()

    if( !email ){
      return toast.error("enter your email")
    }

    if(!validateEmail){
      return toast.error("Please enter a valid email!!")
    }

    const userData = {
      email
    }

    await dispatch(forgotPass(userData))
    await dispatch(RESET(userData))

  }

  const { isLoading } = useSelector((state) => state.auth)
  

  return (
    <div className={`container ${styles.auth}`}>
      { isLoading && <Loader/> }
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgot} >
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
