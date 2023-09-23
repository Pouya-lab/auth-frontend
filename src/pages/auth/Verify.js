import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RESET, verifyUser } from "../../redux/features/auth/authSlice";

const Verify = () => {

  const dispatch = useDispatch()
  const { verificationToken } = useParams()

  const verifyAccount = async()=>{
    await dispatch(verifyUser(verificationToken))
    await dispatch(RESET())
  }
  
  const { isLoading } = useSelector((state)=> state.auth)

  return (
    <section>
      { isLoading && <Loader/>}

      <div className="--center-all">
        <h2>Account Verification</h2>
        <p>To verify your account, click the button below...</p>
        <br />
        <button onClick={verifyAccount} className="--btn --btn-primary">
          Verify Account
        </button>
      </div>
    </section>
  );
};

export default Verify;
